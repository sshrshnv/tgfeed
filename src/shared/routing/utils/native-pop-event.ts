let nativePopEventIgnored = false
export const ignoreNativePopEvent = () => {
  nativePopEventIgnored = true
}

export const listenNativePopEvent = (handler: () => void) => {
  self.addEventListener('popstate', () => {
    if (nativePopEventIgnored) {
      nativePopEventIgnored = false
      return
    }
    handler()
  })
}
