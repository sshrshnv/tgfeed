import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'

export const selectFolder = (
  folderId: Folder['id']
) => {
  setFeedState('currentFolderId', folderId)
}
