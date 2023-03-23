import { expose } from 'comlink'
import { openDB } from 'idb'

import type { DBSchema, DBWorker, DBWorkerMessage } from './db-types'

const DB_NAME = 'tgfeed'
const DB_VERSION = 1

const dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('api')
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

const dbWorker: DBWorker = {
  call: async cb => {
    const db = await dbPromise
    return cb(db)
  }
}

self.onmessage = (ev: MessageEvent<DBWorkerMessage>) => {
  expose(dbWorker, ev.data.mainPort)
  expose(dbWorker, ev.data.apiPort)
}
