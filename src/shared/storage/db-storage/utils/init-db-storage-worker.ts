import { comlink, createPromise, postMessage } from '~/shared/utils'

import { DBStorage, DBStorageWorkerMessage } from '../db-storage.types'

let dbStorageWorkerInstance: Worker
let [dbStorageWorkerPromise, resolveDbStorageWorkerPromise] = createPromise<DBStorage>()

export function initDbStorageWorker(
  mainDbStorageMessageChannel: MessageChannel,
  apiDbStorageMessageChannel: MessageChannel
) {
  if (dbStorageWorkerInstance) {
    try {
      dbStorageWorkerInstance.terminate()
    } finally {
      [dbStorageWorkerPromise, resolveDbStorageWorkerPromise] = createPromise<DBStorage>()
    }
  }

  dbStorageWorkerInstance = new Worker(new URL(
    '../db-storage.worker' /* webpackChunkName: 'db.worker' */,
    import.meta.url
  ))

  postMessage<DBStorageWorkerMessage>(dbStorageWorkerInstance, {
    mainPort: mainDbStorageMessageChannel.port1,
    apiPort: apiDbStorageMessageChannel.port1
  }, [
    mainDbStorageMessageChannel.port1,
    apiDbStorageMessageChannel.port1
  ])

  resolveDbStorageWorkerPromise(comlink.wrap(mainDbStorageMessageChannel.port2) as DBStorage)
}

export const getDbStorageWorker = () => dbStorageWorkerPromise
