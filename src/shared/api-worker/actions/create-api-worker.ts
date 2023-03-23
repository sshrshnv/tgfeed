import { wrap } from 'comlink'

import { createPromise, postMessage } from '~/shared/utils'

import type { APIWorker } from '../api-types'

let worker: Worker
let [workerPromise, resolveWorkerPromise] = createPromise<APIWorker>()

export function createApiWorker(
  mainApiMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) {
  if (worker) {
    try {
      worker.terminate()
    } finally {
      [workerPromise, resolveWorkerPromise] = createPromise<APIWorker>()
    }
  }

  worker = new Worker(new URL(
    '../api-worker' /* webpackChunkName: 'api-worker' */,
    import.meta.url
  ))

  postMessage(worker, {
    mainPort: mainApiMessageChannel.port1,
    dbPort: apiDbMessageChannel.port2
  }, [
    mainApiMessageChannel.port1,
    apiDbMessageChannel.port2
  ])

  resolveWorkerPromise(wrap(mainApiMessageChannel.port2) as APIWorker)
}

export const getApiWorker = () => workerPromise
