import { comlink, createPromise, postMessage } from '~/shared/utils'

import type { APIWorker } from '../api.types'

let apiWorkerInstance: Worker
let [apiWorkerProxyPromise, resolveApiWorkerProxyPromise] = createPromise<APIWorker>()

export const initApiWorker = (
  mainApiMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) => {
  if (apiWorkerInstance) {
    try {
      apiWorkerInstance.terminate()
    } finally {
      [apiWorkerProxyPromise, resolveApiWorkerProxyPromise] = createPromise<APIWorker>()
    }
  }

  apiWorkerInstance = new Worker(new URL(
    '../worker/api.worker' /* webpackChunkName: 'api.worker' */,
    import.meta.url
  ))

  postMessage(apiWorkerInstance, {
    mainPort: mainApiMessageChannel.port1,
    dbPort: apiDbMessageChannel.port2
  }, [
    mainApiMessageChannel.port1,
    apiDbMessageChannel.port2
  ])

  resolveApiWorkerProxyPromise(comlink.wrap(mainApiMessageChannel.port2) as APIWorker)
}

export const getApiWorkerProxy = () => apiWorkerProxyPromise
