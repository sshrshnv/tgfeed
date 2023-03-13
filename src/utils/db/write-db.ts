import type { DbWorker } from './worker/db.types'
import { loadDbWorker } from './worker/load-db-worker'

export const writeDb: DbWorker['set'] = async (...args) => {
  const dbWorker = await loadDbWorker()
  return dbWorker.set(...args)
}
