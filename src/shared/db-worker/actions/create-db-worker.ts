import { wrap } from 'comlink'

import { createPromise, postMessage } from '~/shared/utils'

import { DBWorker, DBWorkerMessage } from '../db-types'

let worker: Worker
let [workerPromise, resolveWorkerPromise] = createPromise<DBWorker>()

export function createDbWorker(
  mainDbMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) {
  if (worker) {
    try {
      worker.terminate()
    } finally {
      [workerPromise, resolveWorkerPromise] = createPromise<DBWorker>()
    }
  }

  worker = new Worker(new URL(
    '../db-worker' /* webpackChunkName: 'db-worker' */,
    import.meta.url
  ))

  postMessage<DBWorkerMessage>(worker, {
    mainPort: mainDbMessageChannel.port1,
    apiPort: apiDbMessageChannel.port1
  }, [
    mainDbMessageChannel.port1,
    apiDbMessageChannel.port1
  ])

  resolveWorkerPromise(wrap(mainDbMessageChannel.port2) as DBWorker)
}

export const getDbWorker = () => workerPromise
