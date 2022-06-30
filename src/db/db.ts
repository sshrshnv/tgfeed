import { wrap } from 'comlink'

import type { Db, LiteDb } from './db.types'

export const db = wrap<Db>(new Worker(new URL(
  /* webpackChunkName: 'db.worker' */
  './db.worker',
  import.meta.url
))) as Db

export const liteDb: LiteDb = {
  set: (key, value) => new Promise(resolve => {
    try {
      const item = JSON.stringify(value)
      self.localStorage.setItem(key, item)
    } catch (_err) {/* nothing */}
    resolve()
  }),

  get: (key, params) => new Promise(resolve => {
    let value
    try {
      const item = self.localStorage.getItem(key)
      value = item && JSON.parse(item)
    } catch (_err) {/* nothing */}
    resolve(value || params?.fallback)
  }),

  clear: () => new Promise(resolve => {
    try {
      self.localStorage.clear()
    } catch (_err) {/* nothing */}
    resolve()
  })
}
