import { api } from '~/shared/api'

export const getNearestDc = () =>
  api.req('help.getNearestDc')
