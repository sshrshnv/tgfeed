import type { FeedState, Folder } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'

export const resolveCurrentFolderState = (
  state: FeedState,
  update: Partial<FeedState>,
  folders: Folder[]
) => {
  update.currentFolderId = update.defaultFolderVisibility ?
    DEFAULT_FOLDER_ID : (folders?.[0]?.id || DEFAULT_FOLDER_ID)

  if (update.currentFolderId === DEFAULT_FOLDER_ID && (
    !state.defaultFolderVisibility ||
    !update.defaultFolderVisibility
  )) {
    update.defaultFolderVisibility = true
  }

  return update
}
