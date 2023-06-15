import type { Route } from '../routing.types'
import { setRouting } from '../routing.state'
import { listenNativePopEvent } from '../utils'

let nativePopEventListenerAdded = false

export const pushRoute = (route: Route) => {
  if (!nativePopEventListenerAdded) {
    nativePopEventListenerAdded = true
    listenNativePopEvent(() => setRouting(state => ({
      history: state.history.slice(0, state.history.length - 1)
    })))
  }

  setRouting(state => {
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
}
