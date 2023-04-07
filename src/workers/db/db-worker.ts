import { comlink } from '~/utils'

import { DBWorker } from './db.types'
import { getDbWorkerProxy } from './actions'

export const dbWorker: DBWorker = {
  call: async cb => {
    const dbWorkerProxy = await getDbWorkerProxy()
    return dbWorkerProxy.call(comlink.proxy(cb))
  }
}
