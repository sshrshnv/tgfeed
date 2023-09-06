import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'
import { postMessage } from '~/shared/utils/post-message'

import type { API } from '../api.types'

let apiWorkerInstance: Worker
let [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<API>()

export const initApiWorker = (
  mainApiMessageChannel: MessageChannel
) => {
  if (apiWorkerInstance) {
    try {
      apiWorkerInstance.terminate()
    } finally {
      [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<API>()
    }
  }

  apiWorkerInstance = new Worker(new URL(
    './api-worker' /* webpackChunkName: 'api-worker' */,
    import.meta.url
  ))

  postMessage(apiWorkerInstance, {
    mainPort: mainApiMessageChannel.port1
  }, [
    mainApiMessageChannel.port1
  ])

  resolveApiWorkerPromise(
    comlink.wrap(mainApiMessageChannel.port2) as API
  )
}

export const getApiWorker = () => apiWorkerPromise
