import { createStore } from 'solid-js/store'

import { getPersistedAccountState } from '~/core/account'
import { introRoutes } from '~/intro'
import { authRoutes } from '~/auth'
import { feedRoutes } from '~/feed'

import type { Route } from './routing.types'

const getInitialPageRoute = () => {
  const persistedAccount = getPersistedAccountState()
  return (
    self.location.pathname === introRoutes.page.path ? introRoutes.page :
    persistedAccount.authorized ? feedRoutes.page :
    authRoutes.page
  )
}

export const [routingState, setRoutingState] = createStore({
  initialPageRoute: getInitialPageRoute(),
  history: [] as Route[],
  get currentPageRoute() {
    return this.history.findLast(route => route.type === 'page') || this.initialPageRoute
  },
  get currentDialogRoute() {
    return this.history.findLast(route => route.type === 'dialog')
  },
  get dialogRoutes() {
    return this.history.filter(route => route.type === 'dialog')
  },
  get currentRoute() {
    return this.history.at(-1) || this.initialPageRoute
  }
})