import { openDB } from 'idb'

import { comlink } from '~/shared/utils'
import { upgradeApiDbStore } from '~/shared/api/utils/upgrade-api-db-store'
import { upgradeAccountDbStore } from '~/core/account/utils/upgrade-account-db-store'
import { upgradeChannelsDbStore } from '~/feed/channels/utils/upgrade-channels-db-store'
import { upgradePostsDbStore } from '~/feed/posts/utils/upgrade-posts-db-store'

import type { DBSchema, DBStorageWorkerMessage } from './db-storage.types'
import { initDbStorage } from './utils/init-db-storage'

const DB_NAME = 'tgfeed'
const DB_VERSION = 2

const dbPromise = openDB<DBSchema>(DB_NAME, DB_VERSION, {
  upgrade(db, oldDbVersion) {
    switch (oldDbVersion) {
    case 0:
      db.createObjectStore('state')
      upgradeChannelsDbStore(db)
      upgradePostsDbStore(db)
    case 1:
      upgradeApiDbStore(db)
      upgradeAccountDbStore(db)
    }
  },

  blocked(currentVersion, blockedVersion, event) {
    //
  },
})

const getDbPromise = () => dbPromise
const dbStorageWorker = initDbStorage(getDbPromise)

self.onmessage = (ev: MessageEvent<DBStorageWorkerMessage>) => {
  if (ev.data?.mainPort) {
    comlink.expose(dbStorageWorker, ev.data.mainPort)
  }
  if (ev.data?.apiPort) {
    comlink.expose(dbStorageWorker, ev.data.apiPort)
  }
}
