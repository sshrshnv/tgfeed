import type { Route } from '../routing.types'
import { setRouting } from '../routing.state'
import { listenNativePopEvent, findRouteIndex } from '../utils'

let nativePopEventListenerAdded = false

export const pushRoute = (route: Route) => {
  if (!nativePopEventListenerAdded) {
    nativePopEventListenerAdded = true
    listenNativePopEvent(() => setRouting(state => ({
      history: state.history.toSpliced(-1)
    })))
  }

  setRouting(state => {
    const routeIndex = findRouteIndex(state.history, route)

    if (routeIndex < 0) {
      self.history.pushState(null, '', route.path)
    } else if (route.path && self.location.pathname !== route.path) {
      self.history.replaceState(null, '', route.path)
    }

    const history = state.history.toSpliced(routeIndex, routeIndex < 0 ? 0 : 1)
    history.push(route)

    return { history }
  })
}
