import type { Route } from '../routing.types'
import { setRouting } from '../routing.state'

export const pushRoute = (route: Route) => setRouting(state => {
  const historyLength = state.history.length
  const history = [
    ...state.history.filter(item =>
      item.type === route.type && self.JSON.stringify(item) === self.JSON.stringify(route)
    ),
    route
  ]

  if (historyLength < history.length) {
    self.history.pushState(null, '')
  }

  return { history }
})