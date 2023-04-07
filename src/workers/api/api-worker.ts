import { comlink } from '~/utils'

import type { APIWorker } from './api.types'
import { getApiWorkerProxy } from './actions'

export const apiWorker: APIWorker = {
  call: async cb => {
    const apiWorkerProxy = await getApiWorkerProxy()
    return apiWorkerProxy.call(comlink.proxy(cb))
  }
}
