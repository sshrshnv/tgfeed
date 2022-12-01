import type { LiteDb } from './lite-db.types'

let restoredData

export const liteDb: LiteDb = {
  set: async (key, value) => {
    try {
      const item = JSON.stringify(value)
      self.localStorage.setItem(key, item)
    } catch (_err) {/* nothing */}
  },

  get: (key) => {
    try {
      const item = self.localStorage.getItem(key)
      const value = item && JSON.parse(item)
      return value
    } catch (_err) {/* nothing */}
  },

  getAll: <T>() => {
    try {
      const items = Object.entries(self.localStorage)
      const values = items.reduce((obj, [key, item]) => {
        obj[key] = item && JSON.parse(item)
        return obj
      }, {} as T)
      return values
    } catch (_err) {/* nothing */}
  },

  getRestored: <T>() => {
    if (restoredData) {
      return restoredData as T
    }
    restoredData = liteDb.getAll<T>()
    return restoredData
  },

  clear: () => {
    try {
      self.localStorage.clear()
    } catch (_err) {/* nothing */}
  }
}
