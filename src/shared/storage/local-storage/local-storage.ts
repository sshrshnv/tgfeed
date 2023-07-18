const STORAGE_KEY = 'tgfeed'
let storageCache: Record<string, any>

const getStorageCache = () => {
  if (!storageCache) {
    try {
      const storageJSON = self.localStorage.getItem(STORAGE_KEY)
      storageCache = storageJSON && JSON.parse(storageJSON)
    } finally {
      storageCache ??= {}
    }
  }
  return storageCache
}

export const localStorage = {
  setItem: (key, value) => {
    getStorageCache()[key] = value
    self.setTimeout(() => {
      try {
        self.localStorage.setItem(STORAGE_KEY, JSON.stringify(getStorageCache()))
      } catch {}
    }, 0)
  },

  getItem: <T>(key): T | null => {
    return getStorageCache()[key]
  },

  removeItem: (key) => {
    delete getStorageCache()[key]
    self.setTimeout(() => {
      try {
        self.localStorage.setItem(STORAGE_KEY, JSON.stringify(getStorageCache()))
      } catch {}
    }, 0)
  },

  clear: () => {
    try {
      self.localStorage.clear()
    } catch {}
  },

  key: (index) => {
    try {
      return self.localStorage.key(index)
    } catch {}
  },

  get length() {
    try {
      return self.localStorage.length
    } catch {}
  }
}
