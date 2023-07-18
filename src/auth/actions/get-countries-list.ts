import { api } from '~/shared/api'

export const getCountriesList = () =>
  api.req('help.getCountriesList', {
    lang_code: 'en',
    hash: 0
  })
