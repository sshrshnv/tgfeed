export const localStorage = {
  set: (...args: Parameters<typeof self.localStorage.setItem>) => {
    try {
      self.localStorage.setItem(...args)
    } catch {}
  },

  get: <T>(...args: Parameters<typeof self.localStorage.getItem>) => {
    try {
      return self.localStorage.getItem(...args) as T
    } catch {}
  }
}
