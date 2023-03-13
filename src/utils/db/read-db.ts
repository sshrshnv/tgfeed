import type { DbWorker } from './worker/db.types'
import { loadDbWorker } from './worker/load-db-worker'

export const readDb: DbWorker['get'] = async (...args) => {
  const dbWorker = await loadDbWorker()
  return dbWorker.get(...args)
}
