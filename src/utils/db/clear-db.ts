import type { DbWorker } from './worker/db.types'
import { loadDbWorker } from './worker/load-db-worker'

export const clearDb: DbWorker['clear'] = async (...args) => {
  const dbWorker = await loadDbWorker()
  return dbWorker.clear(...args)
}
