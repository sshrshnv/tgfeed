import type { AuthAuthorization } from '~/shared/api/mtproto'

import { setAccountState } from '~/core/account'
import { feedRoutes } from '~/feed'
import { pushRoute } from '~/shared/routing'

import { DEFAULT_AUTH_STATE, setAuthState } from '../auth-state'

export const handleSignIn = (res: AuthAuthorization) => {
  console.log('================> handleSignIn', 0)
  if (res._ === 'auth.authorizationSignUpRequired' || res.user._ === 'userEmpty') {
    throw new Error('PHONE_NUMBER_UNOCCUPIED')
  }
  console.log('================> handleSignIn', 1)
  setAccountState({
    authorized: true,
    data: res.user
  })
  console.log('================> handleSignIn', 2)
  pushRoute(feedRoutes.page)
  setAuthState(DEFAULT_AUTH_STATE)
}
