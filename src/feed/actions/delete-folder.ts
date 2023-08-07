import { api } from '~/shared/api'

import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'

export const deleteFolder = async (
  id: Folder['id']
) => {
  await api.req('messages.deleteMessages', {
    id: [id]
  })
  setFeedState('folders', folders => folders.filter(folder => folder.id !== id))
}
