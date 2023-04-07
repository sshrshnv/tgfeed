import { comlink, createPromise, postMessage } from '~/utils'

import { DBWorker, DBWorkerMessage } from '../db.types'

let dbWorkerInstance: Worker
let [dbWorkerProxyPromise, resolveDbWorkerProxyPromise] = createPromise<DBWorker>()

export function initDbWorker(
  mainDbMessageChannel: MessageChannel,
  apiDbMessageChannel: MessageChannel
) {
  if (dbWorkerInstance) {
    try {
      dbWorkerInstance.terminate()
    } finally {
      [dbWorkerProxyPromise, resolveDbWorkerProxyPromise] = createPromise<DBWorker>()
    }
  }

  dbWorkerInstance = new Worker(new URL(
    '../worker/db.worker' /* webpackChunkName: 'db.worker' */,
    import.meta.url
  ))

  postMessage<DBWorkerMessage>(dbWorkerInstance, {
    mainPort: mainDbMessageChannel.port1,
    apiPort: apiDbMessageChannel.port1
  }, [
    mainDbMessageChannel.port1,
    apiDbMessageChannel.port1
  ])

  resolveDbWorkerProxyPromise(comlink.wrap(mainDbMessageChannel.port2) as DBWorker)
}

export const getDbWorkerProxy = () => dbWorkerProxyPromise
