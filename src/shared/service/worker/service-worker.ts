declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: any
}

import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'

import type { Service } from '../service.types'
import { SERVICE_WORKER_SKIP_WAITING_MESSAGE, SERVICE_STREAM_URL } from '../service.const'
import { workbox } from './utils/workbox'
import { handleStreamRoute } from './utils/handle-stream-route'
import { handleStreamFilePartLoad } from './utils/handle-stream-file-part-load'

const [streamsStatePromise, resolveStreamsStatePromise] = createPromise()
let loadStreamFilePart: Parameters<Service['handleStreams']>[0]

workbox.setCacheNameDetails({ prefix: 'tgfeed' })
workbox.clientsClaim()

if (process.env.DEPLOY_ENV === 'production') {
  workbox.precacheAndRoute(self.__WB_MANIFEST)
  workbox.cleanupOutdatedCaches()

  workbox.registerRoute(
    ({ request }) => /\.[0-9a-z]{8}\.(avif|webp|png|jpe?g)/.test(request.url),
    new workbox.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.ExpirationPlugin({
          maxAgeSeconds: 365 * 24 * 60 * 60
        })
      ]
    })
  )

  workbox.registerRoute(
    new workbox.NavigationRoute(
      workbox.createHandlerBoundToURL('/index.html'),
      { allowlist: [/^(?!\/__)/] }
    )
  )
}

workbox.registerRoute(
  new RegExp(SERVICE_STREAM_URL),
  async (params) => {
    await streamsStatePromise
    return handleStreamRoute(params, loadStreamFilePart)
  }
)

const service: Service = {
  check: async () => true,

  handleStreams: async (load) => {
    loadStreamFilePart = load
    resolveStreamsStatePromise()
  },

  handleStreamFilePartLoad: async (...args) => {
    handleStreamFilePartLoad(...args)
  }
}

self.onmessage = (ev) => {
  if (ev.data?.port) {
    comlink.expose(service, ev.data.port)
    return
  }
  if (ev.data?.type === SERVICE_WORKER_SKIP_WAITING_MESSAGE) {
    self.skipWaiting()
    return
  }
}
