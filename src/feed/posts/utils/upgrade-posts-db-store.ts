import type { DBStorageManager } from '~/shared/storage/db-storage'

export const upgradePostsDbStore = (db: DBStorageManager) => {
  const postsStore = db.createObjectStore('posts', {
    keyPath: 'uuid'
  })
  postsStore.createIndex('date', 'date')
  postsStore.createIndex('peer_id', 'peer_id')
}
