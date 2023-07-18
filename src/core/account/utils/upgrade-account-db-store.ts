import type { DBStorageManager } from '~/shared/storage/db-storage'

export const upgradeAccountDbStore = (db: DBStorageManager) => {
  db.createObjectStore('account')
}
