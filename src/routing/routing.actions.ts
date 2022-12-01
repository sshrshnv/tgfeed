import type { RoutingState, Route } from './routing.state'
import { routingState, setRoutingState } from './routing.state'

const history = new Map<string, string>()
let isNativePopEventListenerAdded = false
let isNativePopEventHandled = false

export const pushRoute = (route: Route) => {
  if (!isNativePopEventListenerAdded) {
    addNativePopEventListener()
  }

  const historyKey = JSON.stringify(route)

  if (history.has(historyKey)) {
    history.delete(historyKey)
  } else {
    self.history.pushState(null, '', route.path || self.location.pathname)
  }

  history.set(historyKey, JSON.stringify(routingState))
  setCurrentRoute(route)
}

export const popRoute = (route: Route) => {
  isNativePopEventHandled = true

  const keys = [...history.keys()]
  const historyKey = JSON.stringify(route)
  const historyState = history.get(historyKey)

  if (!historyState) return

  const redundantKeys = keys.slice(keys.lastIndexOf(historyKey))
  redundantKeys.forEach(key => history.delete(key))

  self.history.go(-redundantKeys.length)
  setRoutingState(JSON.parse(historyState))
}

const setCurrentRoute = (route: Route) => setRoutingState(state => ({
  currentActiveRoute: route,
  activeRouteIds: {
    [route.type]: [...state.activeRouteIds[route.type], route.id]
  }
}) as RoutingState)

const handleNativePopEvent = () => {
  if (isNativePopEventHandled) {
    isNativePopEventHandled = false
    return
  }

  const keys = [...history.keys()]
  const historyKey = keys[keys.length - 1]
  const historyState = history.get(historyKey)

  if (!historyState) return

  history.delete(historyKey)
  setRoutingState(JSON.parse(historyState))
}

const addNativePopEventListener = () => {
  isNativePopEventListenerAdded = true
  self.addEventListener('popstate', handleNativePopEvent)
}
