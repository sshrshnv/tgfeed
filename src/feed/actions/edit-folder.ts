import { api } from '~/shared/api'

import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { stringifyConfigMessage } from '../utils'

export const editFolder = async (
  id: Folder['id'],
  data: {
    name: Folder['name']
    channelIds: Folder['channelIds']
  }
) => {
  await api.req('messages.editMessage', {
    peer: {
      _: 'inputPeerSelf'
    },
    message: stringifyConfigMessage(data),
    id
  })
  setFeedState('folders', folder => folder.id === id, data)
}
