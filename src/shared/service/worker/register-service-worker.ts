import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'
import { setDelay } from '~/shared/utils/set-delay'
import { postMessage } from '~/shared/utils/post-message'
import { showUpdate } from '~/core/update/actions/show-update'
import { setFeedState } from '~/feed/feed-state'
import { loadStreamFilePart } from '~/feed/utils/load-stream-file-part'

import type { Service } from '../service.types'
import { SERVICE_WORKER_SKIP_WAITING_MESSAGE } from '../service.const'
import { reregisterServiceWorker } from '../utils/reregister-service-worker'

const WAITING_TIMEOUT_DURATION = 200

const [servicePromise, resolveServicePromise] = createPromise<Service>()
const [serviceWorkerPromise, resolveServiceWorkerPromise] = createPromise<ServiceWorker>()
let serviceWorker: ServiceWorker
let controllingServiceWorker: ServiceWorker | null
let updateFoundCount = 0
let waitingTimeoutId = 0
let registration: ServiceWorkerRegistration | undefined
let registrationStarted = false

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return
  if (process.env.NODE_ENV !== 'production' && registrationStarted) return

  registrationStarted = true
  const registrationTimeoutId = reregisterServiceWorker()

  if (document.readyState !== 'complete') {
    await new Promise(resolve => self.addEventListener('load', resolve))
  }

  controllingServiceWorker = navigator.serviceWorker.controller

  registration = await navigator.serviceWorker.register(new URL(
    './service-worker.ts' /* webpackChunkName: 'service-worker' */,
    import.meta.url
  ))

  if (controllingServiceWorker) {
    serviceWorker = controllingServiceWorker
    controllingServiceWorker.addEventListener('statechange', handleStateChange, { once: true })
  }

  const waitingServiceWorker = registration!.waiting

  if (waitingServiceWorker) {
    serviceWorker = waitingServiceWorker
    await setDelay(0)
    startUpdate()
  }

  if (serviceWorker) {
    resolveServiceWorkerPromise(serviceWorker)
    self.clearTimeout(registrationTimeoutId)
  }

  registration!.addEventListener('updatefound', handleUpdateFound)
  navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

  const serviceWorkerInstance = await serviceWorkerPromise
  const { port1, port2 } = new MessageChannel()

  postMessage(serviceWorkerInstance, {
    port: port1
  }, [port1])

  const service = comlink.wrap(port2) as Service
  resolveServicePromise(service)

  service.handleStreams?.(
    comlink.proxy(loadStreamFilePart)
  ).then(() => {
    setFeedState('streamsHandlerActivated', true)
  })
}

export const isServiceWorkerRegistered = () =>
  !!registration

export const getService = () => servicePromise

export const endUpdate = () => {
  postMessage(serviceWorker, {
    type: SERVICE_WORKER_SKIP_WAITING_MESSAGE
  })
}

const startUpdate = () => {
  if (process.env.NODE_ENV === 'production') {
    showUpdate()
  } else {
    endUpdate()
  }
}

const handleUpdateFound = () => {
  const installingServiceWorker = registration!.installing!

  if (updateFoundCount > 0) {
    registration!.removeEventListener('updatefound', handleUpdateFound)
  }
  else {
    serviceWorker = installingServiceWorker
    resolveServiceWorkerPromise(installingServiceWorker)
  }

  updateFoundCount += 1
  installingServiceWorker.addEventListener('statechange', handleStateChange)
}

const handleStateChange = ev => {
  const serviceWorker = ev.target as ServiceWorker
  const { state } = serviceWorker

  if (state === 'installed') {
    waitingTimeoutId = self.setTimeout(() => {
      if (state === 'installed' && registration?.waiting === serviceWorker) {
        startUpdate()
      }
    }, WAITING_TIMEOUT_DURATION)
  }
  else if (state === 'activating') {
    self.clearTimeout(waitingTimeoutId)
  }
}

const handleControllerChange = () => {
  self.location.reload()
}
