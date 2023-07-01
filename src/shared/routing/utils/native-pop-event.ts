import { routing } from '../routing.state'

let nativePopEventIgnored = false
export const ignoreNativePopEvent = () => {
  nativePopEventIgnored = true
}

export const listenNativePopEvent = (handler: () => void) => {
  self.addEventListener('popstate', () => {
    if (nativePopEventIgnored) {
      nativePopEventIgnored = false
    } else {
      handler()
    }
    if (self.location.pathname !== routing.currentPageRoute.path) {
      self.history.replaceState(null, '', routing.currentPageRoute.path)
    }
  })
}
