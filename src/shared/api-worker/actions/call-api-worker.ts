import type { APIWorker } from '../api-types'
import { getApiWorker } from './create-api-worker'

export const callApiWorker: APIWorker['call'] = async cb => {
  const worker = await getApiWorker()
  return worker.call(cb)
}
