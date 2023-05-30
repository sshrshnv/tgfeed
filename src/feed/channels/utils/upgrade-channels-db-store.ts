import type { DB } from '~/shared/db'

export const upgradeChannelsDbStore = (db: DB) => {
  db.createObjectStore('channels', {
    keyPath: 'uuid'
  })
}
