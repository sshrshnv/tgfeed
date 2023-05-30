import { comlink, createPromise, postMessage } from '~/shared/utils'

import type { APIWorker } from '../api.types'

let apiWorkerInstance: Worker
let [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<APIWorker>()

export const initApiWorker = (
  mainApiMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) => {
  if (apiWorkerInstance) {
    try {
      apiWorkerInstance.terminate()
    } finally {
      [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<APIWorker>()
    }
  }

  apiWorkerInstance = new Worker(new URL(
    '../api.worker' /* webpackChunkName: 'api.worker' */,
    import.meta.url
  ))

  postMessage(apiWorkerInstance, {
    mainPort: mainApiMessageChannel.port1,
    dbPort: apiDbMessageChannel.port2
  }, [
    mainApiMessageChannel.port1,
    apiDbMessageChannel.port2
  ])

  resolveApiWorkerPromise(comlink.wrap(mainApiMessageChannel.port2) as APIWorker)
}

export const getApiWorker = () => apiWorkerPromise
