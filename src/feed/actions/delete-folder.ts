import { api } from '~/shared/api'

import type { FeedState, Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { resolveCurrentFolderState } from '../utils/resolve-current-folder-state'

export const deleteFolder = (
  folder: Folder
) => {
  setFeedState(state => {
    const stateUpdates: Partial<FeedState> = {}
    stateUpdates.folders = state.folders.filter(({ id }) => id !== folder.id)

    if (state.currentFolderId === folder.id) {
      resolveCurrentFolderState(state, stateUpdates)
    }

    return stateUpdates
  })

  return api.req('messages.deleteMessages', {
    id: [folder.id]
  })
}
