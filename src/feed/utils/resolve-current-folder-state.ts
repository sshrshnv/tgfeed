import type { FeedState } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'

export const resolveCurrentFolderState = (
  state: FeedState,
  stateUpdates: Partial<FeedState>
) => {
  stateUpdates.currentFolderId = state.defaultFolderVisibility ?
    DEFAULT_FOLDER_ID : (stateUpdates.folders?.[0]?.id || DEFAULT_FOLDER_ID)

  if (stateUpdates.currentFolderId === DEFAULT_FOLDER_ID && !state.defaultFolderVisibility) {
    stateUpdates.defaultFolderVisibility = true
  }

  return stateUpdates
}
