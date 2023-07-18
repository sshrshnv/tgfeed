import type { DBStorageManager } from '~/shared/storage/db-storage'

export const upgradeApiDbStore = (db: DBStorageManager) => {
  db.createObjectStore('apiMeta')
  db.createObjectStore('apiRequests')
}
