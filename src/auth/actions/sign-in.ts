import { api } from '~/shared/api'

import { authState, setAuthState } from '../auth-state'
import { sendCode } from './send-code'
import { handleSignIn } from './handle-sign-in'

export const signIn = (
  phone_code: string
) => api.req('auth.signIn', {
  phone_code,
  phone_number: authState.phone_number || '',
  phone_code_hash: authState.meta?.phone_code_hash || ''
})
  .then(handleSignIn)
  .catch(async (err) => {
    if (err.message === 'PHONE_CODE_EXPIRED' && authState.phone_number) {
      await sendCode(authState.phone_number)
    }
    if (err.message === 'SESSION_PASSWORD_NEEDED') {
      setAuthState({ step: 'password' })
      return
    }
    throw err
  })
