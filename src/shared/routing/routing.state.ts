import { createStore } from 'solid-js/store'

import type { Route } from './routing.types'
import { getInitialPageRoute } from './actions/get-initial-page-route'

export const [routing, setRouting] = createStore({
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
    return this.history[this.history.length - 1] || this.initialPageRoute
  }
})
