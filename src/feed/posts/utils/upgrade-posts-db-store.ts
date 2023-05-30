import type { DB } from '~/shared/db'

export const upgradePostsDbStore = (db: DB) => {
  const postsStore = db.createObjectStore('posts', {
    keyPath: 'uuid'
  })
  postsStore.createIndex('date', 'date')
  postsStore.createIndex('peer_id', 'peer_id')
}
