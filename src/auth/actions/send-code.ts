import { api } from '~/shared/api'

import { setAuthState } from '../auth-state'

export const sendCode = (
  phone_number: string
) => {
  return api.req('auth.sendCode', {
    api_id: +(process.env.API_ID || ''),
    api_hash: process.env.API_HASH || '',
    phone_number,
    settings: {
      _: 'codeSettings'
    }
  }).then(meta => {
    if (meta._ === 'auth.sentCode') {
      setAuthState({ step: 'code', meta })
    }
    return meta
  })
}
