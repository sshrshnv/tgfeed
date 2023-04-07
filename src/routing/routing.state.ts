import { createStore } from 'solid-js/store'

import type { Route } from './routing.types'

export const [routingState, setRoutingState] = createStore({
  history: [] as Route[],
  get page() {
    return this.history.findLast(item => item.type === 'page')
  },
  get popups() {
    return this.history.filter(item => item.type === 'popup')
  },
  get dropdown() {
    const lastItem = this.history[this.history.length - 1]
    return lastItem.type === 'dropdown' ? lastItem : null
  }
})
