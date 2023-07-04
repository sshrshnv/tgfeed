import { callApiWorker } from '~/shared/api'

export const getCountriesList = (
  lang_code: string
) => callApiWorker(api => api.req('help.getCountriesList', {
  lang_code,
  hash: 0
}))
