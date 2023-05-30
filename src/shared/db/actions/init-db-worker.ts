import { comlink, createPromise, postMessage } from '~/shared/utils'

import { DBWorker, DBWorkerMessage } from '../db.types'

let dbWorkerInstance: Worker
let [dbWorkerPromise, resolveDbWorkerPromise] = createPromise<DBWorker>()

export function initDbWorker(
  mainDbMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) {
  if (dbWorkerInstance) {
    try {
      dbWorkerInstance.terminate()
    } finally {
      [dbWorkerPromise, resolveDbWorkerPromise] = createPromise<DBWorker>()
    }
  }

  dbWorkerInstance = new Worker(new URL(
    '../db.worker' /* webpackChunkName: 'db.worker' */,
    import.meta.url
  ))

  postMessage<DBWorkerMessage>(dbWorkerInstance, {
    mainPort: mainDbMessageChannel.port1,
    apiPort: apiDbMessageChannel.port1
  }, [
    mainDbMessageChannel.port1,
    apiDbMessageChannel.port1
  ])

  resolveDbWorkerPromise(comlink.wrap(mainDbMessageChannel.port2) as DBWorker)
}

export const getDbWorker = () => dbWorkerPromise
