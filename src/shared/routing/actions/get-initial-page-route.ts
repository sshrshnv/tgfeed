import { getRestoredAccount } from '~/core/account/actions'
import { introRoutes } from '~/intro'
import { authRoutes } from '~/auth'
import { feedRoutes } from '~/feed'

export const getInitialPageRoute = () => (
  self.location.pathname === introRoutes.page.path ? introRoutes.page :
  getRestoredAccount().authorized ? feedRoutes.page :
  authRoutes.page
)
