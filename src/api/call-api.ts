import type { ApiWorker } from './worker'
import { loadApiWorker } from './worker'

export const callApi: ApiWorker['call'] = async (...args) => {
  const apiWorker = await loadApiWorker()
  return apiWorker.call(...args)
}
