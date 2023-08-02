import { set, get, del, clear } from 'idb-keyval'

import type { APIStorage } from '~/shared/api'
import type { AccountStorage } from '~/core/account'

export type StorageKeyValueMap =
  APIStorage['meta'] &
  AccountStorage['data']

let storageCache: Record<string, any> = {}

export const dbStorage = {
  set: <T extends keyof StorageKeyValueMap>(key: T, value: StorageKeyValueMap[T]) => {
    storageCache[key] = value
    try {
      set(key, value)
    } catch {}
  },

  get: async <T extends keyof StorageKeyValueMap>(key: T): Promise<StorageKeyValueMap[T] | undefined> => {
    if (storageCache[key]) return storageCache[key]
    try {
      storageCache[key] = await get(key)
      return storageCache[key]
    } catch {}
  },

  del: <T extends keyof StorageKeyValueMap>(key: T) => {
    delete storageCache[key]
    try {
      del(key)
    } catch {}
  },

  clear: () => {
    storageCache = {}
    try {
      clear()
    } catch {}
  }
}
