import { wrap } from 'comlink'

import type { Db, LiteDb } from './db.types'

export let db: Db

export const initDb = () => {
  if (db) return db

  db = wrap(new Worker(new URL(
    /* webpackChunkName: 'db.worker' */
    './db.worker',
    import.meta.url
  ))) as Db

  return db
}

export const liteDb: LiteDb = {
  set: (key, value) => {
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
      const values = items.reduce((obj, [key, item]) => ({
        ...obj,
        [key]: item && JSON.parse(item)
      }), {} as T)
      return values
    } catch (_err) {/* nothing */}
  },

  clear: () => {
    try {
      self.localStorage.clear()
    } catch (_err) {/* nothing */}
  }
}
