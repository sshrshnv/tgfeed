import type { FeedState } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { setFeedState } from '../feed-state'

export const toggleDefaultFolder = () => {
  setFeedState(state => {
    const stateUpdates: Partial<FeedState> = {}
    if (!state.folders.length) {
      return stateUpdates
    }

    stateUpdates.defaultFolderVisibility = !state.defaultFolderVisibility

    if (state.currentFolderId === DEFAULT_FOLDER_ID) {
      stateUpdates.currentFolderId = state.folders[0].id
    }

    return stateUpdates
  })
}
