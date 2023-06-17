const STORAGE_KEY = 'tgfeed'
let storageCache: Record<string, any>

const getStorageCache = () => {
  if (!storageCache) {
    try {
      const storageCacheJSON = self.localStorage.getItem(STORAGE_KEY)
      storageCache = storageCacheJSON && JSON.parse(storageCacheJSON)
    } finally {
      storageCache ??= {}
    }
  }
  return storageCache
}

export const localStorage = {
  set: (key: string, value: string | number | boolean | object | null) => {
    getStorageCache()[key] = value
    setTimeout(() => {
      try {
        self.localStorage.setItem(STORAGE_KEY, JSON.stringify(getStorageCache()))
      } catch {}
    }, 0)
  },

  get: <T>(key: string): T | undefined => {
    return getStorageCache()[key]
  }
}
