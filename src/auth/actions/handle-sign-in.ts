import type { AuthAuthorization } from '~/shared/api/mtproto'

import { setAccountState } from '~/core/account/account-state'
import { feedRoutes } from '~/feed/feed-routes'
import { pushRoute } from '~/shared/routing/actions/push-route'

import { DEFAULT_AUTH_STATE } from '../auth.const'
import { setAuthState } from '../auth-state'

export const handleSignIn = (res: AuthAuthorization) => {
  if (res._ === 'auth.authorizationSignUpRequired' || res.user._ === 'userEmpty') {
    throw new Error('PHONE_NUMBER_UNOCCUPIED')
  }
  setAccountState({
    authorized: true,
    data: res.user
  })
  pushRoute(feedRoutes.page)
  setAuthState(DEFAULT_AUTH_STATE)
}
