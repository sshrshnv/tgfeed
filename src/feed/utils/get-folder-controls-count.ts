import type { Folder, PostUuids } from '../feed.types'
import { getFolderUpdatesCount } from './get-folder-updates-count'

export const getFolderControlsCount = (
  scrolling: number,
  folderId: Folder['id'],
  folders: Folder[],
  newPostUuids: PostUuids
) => {
  let count = 0
  if (scrolling < -1 || scrolling > 1) {
    count += 1
  }
  if (getFolderUpdatesCount(folderId, folders, newPostUuids)) {
    count += 1
  }
  return count
}
