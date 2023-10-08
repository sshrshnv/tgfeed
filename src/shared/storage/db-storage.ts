import type { APIStorage } from '~/shared/api'
import type { AccountStorage } from '~/core/account'

import { DB_DATA_STORE_NAME, getDB } from './db'

export type StorageKeyValueMap =
  APIStorage['meta'] &
  AccountStorage['data']

let storageCache: Record<string, any> = {}

export const dbStorage = {
  set: async <T extends keyof StorageKeyValueMap>(key: T, value: StorageKeyValueMap[T]) => {
    storageCache[key] = value
    try {
      const db = await getDB()
      return db.put(DB_DATA_STORE_NAME, value, key)
    } catch {}
  },

  get: async <T extends keyof StorageKeyValueMap>(key: T): Promise<StorageKeyValueMap[T] | undefined> => {
    if (storageCache[key]) return storageCache[key]
    try {
      const db = await getDB()
      storageCache[key] = await db.get(DB_DATA_STORE_NAME, key)
      return storageCache[key]
    } catch {}
  },

  del: async <T extends keyof StorageKeyValueMap>(key: T) => {
    delete storageCache[key]
    try {
      const db = await getDB()
      return db.delete(DB_DATA_STORE_NAME, key)
    } catch {}
  },

  clear: async () => {
    storageCache = {}
    try {
      const db = await getDB()
      return db.clear(DB_DATA_STORE_NAME)
    } catch {}
  }
}
