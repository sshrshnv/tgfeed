import type { RouteState } from './router.routes'
import type { RouterStore } from './router.store'
import { store, setStore } from './router.store'
import { history } from './router.history'

let isNativePopEventListenerAdded = false
let isNativePopEventHandled = false

const setRoute = (route: RouteState) => setStore(state => {
  const newState: Partial<RouterStore> = {}
  Object.keys(route).forEach(key => {
    if (key === 'paneId') {
      newState.paneIds = [...state.paneIds, route.paneId]
    } else {
      newState[key] = route[key]
    }
  })
  return newState
})

export const pushRoute = (route: RouteState) => {
  if (!isNativePopEventListenerAdded) {
    addNativePopEventListener()
  }

  const historyKey = JSON.stringify(route)

  if (history.has(historyKey)) {
    history.delete(historyKey)
  } else {
    self.history.pushState(null, '', route.pagePath)
  }

  history.set(historyKey, JSON.stringify(store))
  setRoute(route)
}

export const popRoute = (route: RouteState) => {
  isNativePopEventHandled = true

  const keys = [...history.keys()]
  const historyKey = JSON.stringify(route)
  const historyState = history.get(historyKey)

  if (!historyState) return

  const redundantKeys = keys.slice(keys.lastIndexOf(historyKey))
  redundantKeys.forEach(key => history.delete(key))

  self.history.go(-redundantKeys.length)
  setStore(JSON.parse(historyState))
}

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
  setStore(JSON.parse(historyState))
}

const addNativePopEventListener = () => {
  isNativePopEventListenerAdded = true
  self.addEventListener('popstate', handleNativePopEvent)
}
