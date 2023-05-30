import { openDB } from 'idb'

import { comlink } from '~/shared/utils'
import { upgradeChannelsDbStore } from '~/feed/channels'
import { upgradePostsDbStore } from '~/feed/posts'

import type { DB, DBSchema, DBWorker, DBWorkerMessage } from './db.types'

const DB_NAME = 'tgfeed'
const DB_VERSION = 1

const dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore('state')

    upgradeChannelsDbStore(db)
    upgradePostsDbStore(db)
  }
})

let db: DB
const dbWorker: DBWorker = {
  call: async cb => {
    if (!db) {
      db = await dbPromise
      db = comlink.proxy(db)
    }
    return cb(db)
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
