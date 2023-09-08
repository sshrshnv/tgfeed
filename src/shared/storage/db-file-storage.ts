import { set, getMany } from 'idb-keyval'

export const dbFileStorage = {
  setBytes: (key: string, bytes: ArrayBuffer) => {
    return set(generateFileKey(key), bytes).catch(() => {})
  },

  getBytes: (keys: string[]) => {
    keys = keys.map(generateFileKey)
    return getMany(keys) as Promise<Uint8Array[] | undefined>
  }
}

const generateFileKey = (key: string) => `file-${key}`
