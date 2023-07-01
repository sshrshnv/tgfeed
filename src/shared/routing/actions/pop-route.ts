import type { Route } from '../routing.types'
import { setRouting } from '../routing.state'
import { ignoreNativePopEvent, findRouteIndex } from '../utils'

export const popRoute = (route: Route | undefined) => {
  if (!route) return
  ignoreNativePopEvent()

  setRouting(state => {
    const routeIndex = findRouteIndex(state.history, route)

    if (routeIndex < 0) return state

    const history = state.history.toSpliced(routeIndex, 1)
    self.history.back()

    return { history }
  })
}
