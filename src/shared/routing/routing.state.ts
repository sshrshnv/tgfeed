import { createStore } from 'solid-js/store'

import type { Route } from './routing.types'

export const [routing, setRouting] = createStore({
  history: [] as Route[],
  get pageRoute() {
    return this.history.findLast(route => route.type === 'page')
  },
  get popupRoutes() {
    return this.history.filter(route => route.type === 'popup')
  },
})
