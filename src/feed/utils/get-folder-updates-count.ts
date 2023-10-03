import type { Folder, PostUuids } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { filterFolderPostUuids } from './filter-folder-post-uuids'

export const getFolderUpdatesCount = (
  folderId: Folder['id'],
  folders: Folder[],
  newPostUuids: PostUuids
) =>
  folderId === DEFAULT_FOLDER_ID ? newPostUuids.length :
  filterFolderPostUuids(folderId, folders, newPostUuids).length
