import type { DB } from '~/shared/db'

export const upgradeApiDbStore = (db: DB) => {
  db.createObjectStore('apiMeta')
  db.createObjectStore('apiRequests')
}
