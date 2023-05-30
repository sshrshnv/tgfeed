import { comlink } from '~/shared/utils'

import type { DBWorkerCaller } from '../db.types'
import { getDbWorker } from './init-db-worker'

export const callDbWorker: DBWorkerCaller = async cb => {
  const dbWorker = await getDbWorker()
  return dbWorker.call(comlink.proxy(cb))
}
