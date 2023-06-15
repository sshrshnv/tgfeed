import { createStore } from 'solid-js/store'

import type { Route } from './routing.types'

export const [routing, setRouting] = createStore({
  history: [] as Route[],
  get currentPageRoute() {
    return this.history.findLast(route => route.type === 'page')
  },
  get currentDialogRoute() {
    return this.history.findLast(route => route.type === 'dialog')
  },
  get dialogRoutes() {
    return this.history.filter(route => route.type === 'dialog')
  },
  get currentRoute() {
    return this.history[this.history.length - 1] as Route | undefined
  }
})
