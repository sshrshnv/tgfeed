import { set, getMany } from 'idb-keyval'

export const dbFileStorage = {
  setBytes: (key: string, bytes: ArrayBuffer) => {
    return set(generateFileKey(key), bytes).catch()
  },

  getBytes: (keys: string[]) => {
    keys = keys.map(generateFileKey)
    return getMany(keys).catch(() => []) as Promise<ArrayBuffer[] | undefined>
  }
}

const generateFileKey = (key: string) => `file-${key}`
