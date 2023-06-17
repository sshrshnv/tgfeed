import type { DB } from '~/shared/db'

export const upgradeAccountDbStore = (db: DB) => {
  db.createObjectStore('account')
}
