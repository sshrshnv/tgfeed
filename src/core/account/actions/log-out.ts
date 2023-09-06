import { api } from '~/shared/api'
import { pushRoute } from '~/shared/routing/actions/push-route'
import { authRoutes } from '~/auth/auth-routes'

import { setAccountState } from '../account-state'

export const logOut = () =>
  api.req('auth.logOut').then(() => {
    setAccountState({
      authorized: false,
      data: null
    })
    pushRoute(authRoutes.page)
  })
