import type { AccountStorage } from '~/core/account'
import type { LocaleStorage } from '~/core/locale'
import type { ThemeStorage } from '~/core/theme'
import type { AuthStorage } from '~/auth'
import type { FeedStorage } from '~/feed'

export type StorageKeyValueMap =
  AccountStorage['state'] &
  LocaleStorage['state'] &
  ThemeStorage['state'] &
  AuthStorage['state'] &
  FeedStorage['state']

const STORAGE_KEY = 'tgfeed'
let storageCache: Record<string, any>

const getStorageCache = () => {
  if (!storageCache) {
    try {
      const storageJSON = self.localStorage?.getItem(STORAGE_KEY)
      storageCache = (storageJSON && JSON.parse(storageJSON)) || {}
    } catch {
      storageCache = {}
    }
  }
  return storageCache
}

export const localStorage = {
  set: <T extends keyof StorageKeyValueMap>(key: T, value: StorageKeyValueMap[T]) => {
    getStorageCache()[key] = value
    self.setTimeout(() => {
      try {
        self.localStorage?.setItem(STORAGE_KEY, JSON.stringify(getStorageCache()))
      } catch {}
    }, 0)
  },

  get: <T extends keyof StorageKeyValueMap>(key: T): StorageKeyValueMap[T] | undefined => {
    return getStorageCache()[key]
  },

  del: <T extends keyof StorageKeyValueMap>(key: T) => {
    delete getStorageCache()[key]
    self.setTimeout(() => {
      try {
        self.localStorage?.setItem(STORAGE_KEY, JSON.stringify(getStorageCache()))
      } catch {}
    }, 0)
  },

  clear: () => {
    try {
      self.localStorage?.clear()
    } catch {}
  }
}
