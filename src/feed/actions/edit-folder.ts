import { api } from '~/shared/api'

import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { stringifyConfigMessage } from '../utils'

export const editFolder = async (
  data: Folder,
  {
    skipStoreUpdate = false
  } = {}
) => {
  await api.req('messages.editMessage', {
    peer: {
      _: 'inputPeerSelf'
    },
    message: stringifyConfigMessage(data),
    id: data.id
  })
  if (skipStoreUpdate) return
  setFeedState('folders', folder => folder.id === data.id, data)
}
