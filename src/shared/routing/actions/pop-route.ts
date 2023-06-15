import type { Route } from '../routing.types'
import { setRouting } from '../routing.state'
import { ignoreNativePopEvent } from '../utils'

export const popRoute = (route: Route | undefined) => {
  if (!route) return
  ignoreNativePopEvent()

  setRouting(state => {
    const routeIndex = state.history.findLastIndex(item =>
      item.type === route.type && self.JSON.stringify(item) === self.JSON.stringify(route)
    )

    if (routeIndex < 0) return state

    const history = state.history.slice(0, routeIndex)
    self.history.go(routeIndex - state.history.length)

    return { history }
  })
}
