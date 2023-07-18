import type { DBStorageManager } from '~/shared/storage/db-storage'

export const upgradeChannelsDbStore = (db: DBStorageManager) => {
  db.createObjectStore('channels', {
    keyPath: 'uuid'
  })
}
