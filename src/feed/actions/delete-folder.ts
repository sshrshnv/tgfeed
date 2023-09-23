import { api } from '~/shared/api'

import type { FeedState, Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { resolveCurrentFolderState } from '../utils/resolve-current-folder-state'

export const deleteFolder = (
  folder: Folder
) => {
  setFeedState(state => {
    const update: Partial<FeedState> = {}
    const folders = state.folders.filter(({ id }) => id !== folder.id)

    if (state.currentFolderId === folder.id) {
      resolveCurrentFolderState(state, update, folders)
    }

    update.folders = folders
    return update
  })

  return api.req('messages.deleteMessages', {
    id: [folder.id]
  })
}
