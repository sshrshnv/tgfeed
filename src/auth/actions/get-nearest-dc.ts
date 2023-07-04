import { callApiWorker } from '~/shared/api'

export const getNearestDc = () =>
  callApiWorker(api => api.req('help.getNearestDc'))
