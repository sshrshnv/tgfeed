import { createStore } from 'solid-js/store'

export type Route = {
  type: 'page' | 'popup' | 'dropdown'
  params: Record<string, string | number | boolean | null | undefined>
}

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
