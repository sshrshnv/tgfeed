import { comlink, createPromise, postMessage } from '~/utils'

import type { APIWorker } from './api.types'

let apiWorkerInstance: Worker
let [apiWorkerProxyPromise, resolveApiWorkerProxyPromise] = createPromise<APIWorker>()

export const apiWorker: APIWorker = {
  call: async cb => {
    const apiWorkerProxy = await apiWorkerProxyPromise
    return apiWorkerProxy.call(comlink.proxy(cb))
  }
}

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
    './worker/api.worker' /* webpackChunkName: 'api.worker' */,
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
