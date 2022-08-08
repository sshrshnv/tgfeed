import type { Route } from './router.routes'
import type { RouterStore } from './router.store'
import { store, setStore } from './router.store'
import { history } from './router.history'

let isNativePopEventListenerAdded = false
let isNativePopEventHandled = false

const setRoute = (route: Route) => setStore(state => {
  const newState: Partial<RouterStore> = {}
  Object.keys(route).forEach(key => {
    if (key === 'popupPageId') {
      newState.popupPageIds = [...state.popupPageIds, route.popupPageId]
    } else {
      newState[key] = route[key]
    }
  })
  return newState
})

export const pushRoute = (route: Route) => {
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

export const popRoute = (route: Route) => {
  isNativePopEventHandled = true

  const keys = [...history.keys()]
  const historyKey = JSON.stringify(route)
  const historyValue = history.get(historyKey)

  if (!historyValue) return

  const redundantKeys = keys.slice(keys.lastIndexOf(historyKey))
  redundantKeys.forEach(key => history.delete(key))

  self.history.go(-redundantKeys.length)
  setStore(JSON.parse(historyValue))
}

const handleNativePopEvent = () => {
  if (isNativePopEventHandled) {
    isNativePopEventHandled = false
    return
  }

  const keys = [...history.keys()]
  const historyKey = keys[keys.length - 1]
  const historyValue = history.get(historyKey)

  if (!historyValue) return

  history.delete(historyKey)
  setStore(JSON.parse(historyValue))
}

const addNativePopEventListener = () => {
  isNativePopEventListenerAdded = true
  self.addEventListener('popstate', handleNativePopEvent)
}
