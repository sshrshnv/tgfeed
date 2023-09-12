import { set, getMany } from 'idb-keyval'

const fileStorageCache: Record<string, ArrayBuffer> = {}

export const dbFileStorage = {
  setBytes: (key: string, bytes: ArrayBuffer) => {
    return set(generateFileKey(key), bytes).catch(() => {
      fileStorageCache[key] = bytes
    })
  },

  getBytes: (keys: string[]) => {
    keys = keys.map(generateFileKey)
    if (keys.every(key => !!fileStorageCache[key])) {
      return keys.map(key => fileStorageCache[key])
    }
    return getMany(keys) as Promise<ArrayBuffer[] | undefined>
  }
}

const generateFileKey = (key: string) => `file-${key}`
