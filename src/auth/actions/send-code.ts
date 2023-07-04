import { callApiWorker } from '~/shared/api'

export const sendCode = (
  phone_number: string
) => callApiWorker(api => api.req('auth.sendCode', {
  api_id: +(process.env.API_ID || ''),
  api_hash: process.env.API_HASH || '',
  phone_number,
  settings: {
    _: 'codeSettings'
  }
}))
