import type { FeedState } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { setFeedState } from '../feed-state'
import { saveConfig } from './save-config'

export const toggleDefaultFolder = () => {
  setFeedState(state => {
    const stateUpdates: Partial<FeedState> = {}

    if (!state.folders.length) {
      return stateUpdates
    }

    stateUpdates.defaultFolderVisibility = !state.defaultFolderVisibility

    saveConfig(stateUpdates, { skipStateUpdate: true })

    if (state.currentFolderId === DEFAULT_FOLDER_ID) {
      stateUpdates.currentFolderId = state.folders[0].id
    }

    return stateUpdates
  })
}
