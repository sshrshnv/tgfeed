import { loadWorkerModule } from '~/utils'

import type { Db } from './db.types'

const DB_WORKER_PATH = './db.worker'

export const db: Db = {
  set: async (...args) => {
    const dbWorker = await loadDbWorker()
    return dbWorker.set(...args)
  },

  get: async (...args) => {
    const dbWorker = await loadDbWorker()
    return dbWorker.get(...args)
  },

  getMany: async (...args) => {
    const dbWorker = await loadDbWorker()
    return dbWorker.getMany(...args)
  },

  clear: async (...args) => {
    const dbWorker = await loadDbWorker()
    return dbWorker.clear(...args)
  }
}

const createDbWorker = () => new Worker(new URL(
  `${DB_WORKER_PATH}` /* webpackChunkName: 'db.worker' */,
  import.meta.url
))

const loadDbWorker = (): Promise<Db> => loadWorkerModule(
  DB_WORKER_PATH,
  createDbWorker
)
