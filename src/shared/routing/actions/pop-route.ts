import { createEffect } from 'solid-js'

import type { Route } from '../routing.types'
import { routing, setRouting } from '../routing.state'

let ignoreNativePopEvent = false

export const popRoute = (route: Route) => setRouting(state => {
  ignoreNativePopEvent = true

  const routeIndex = state.history.findLastIndex(item =>
    item.type === route.type && self.JSON.stringify(item) === self.JSON.stringify(route)
  )

  if (routeIndex < 0) return state

  const history = state.history.slice(0, routeIndex + 1)
  self.history.go(routeIndex - state.history.length)

  return { history }
})

const handleNativePopEvent = () => {
  if (ignoreNativePopEvent) {
    ignoreNativePopEvent = false
    return
  }

  setRouting(state => ({
    history: state.history.slice(0, state.history.length)
  }))
}

createEffect((prev) => {
  if (!prev) {
    self.addEventListener('popstate', handleNativePopEvent)
  } else if (!routing.history.length) {
    self.removeEventListener('popstate', handleNativePopEvent)
  }
})
