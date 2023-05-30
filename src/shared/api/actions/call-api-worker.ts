import { comlink } from '~/shared/utils'

import type { APIWorkerCaller } from '../api.types'
import { getApiWorker } from './init-api-worker'

export const callApiWorker: APIWorkerCaller = async cb => {
  const apiWorker = await getApiWorker()
  return apiWorker.call(comlink.proxy(cb))
}
