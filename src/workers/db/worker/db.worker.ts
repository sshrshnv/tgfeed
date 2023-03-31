import { comlink } from '~/utils'
import { openDB } from 'idb'

import type { DB, DBSchema, DBWorker, DBWorkerMessage } from '../db.types'

const DB_NAME = 'tgfeed'
const DB_VERSION = 1

const dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('state')
    db.createObjectStore('channels', {
      keyPath: 'uuid'
    })
    const postsStore = db.createObjectStore('posts', {
      keyPath: 'uuid'
    })
    postsStore.createIndex('date', 'date')
    postsStore.createIndex('peer_id', 'peer_id')
  }
})

let dbProxy: DB
const dbWorker: DBWorker = {
  call: async cb => {
    if (!dbProxy) {
      const db = await dbPromise
      dbProxy = comlink.proxy(db)
    }
    return cb(dbProxy)
  }
}

self.onmessage = (ev: MessageEvent<DBWorkerMessage>) => {
  if (ev.data?.mainPort) {
    comlink.expose(dbWorker, ev.data.mainPort)
  }
  if (ev.data?.apiPort) {
    comlink.expose(dbWorker, ev.data.apiPort)
  }
}
