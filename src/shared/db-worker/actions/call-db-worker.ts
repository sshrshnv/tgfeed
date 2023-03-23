import type { DBWorker } from '../db-types'
import { getDbWorker } from './create-db-worker'

export const callDbWorker: DBWorker['call'] = async cb => {
  const worker = await getDbWorker()
  return worker.call(cb)
}
