import type { Update } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { stringifyConfigMessage, generateRandomId } from '../utils'

export const createFolder = async (data: {
  name: Folder['name']
  index: Folder['index']
  channelIds: Folder['channelIds']
}) => {
  const random_id = generateRandomId()
  const res = await api.req('messages.sendMessage', {
    peer: {
      _: 'inputPeerSelf'
    },
    message: stringifyConfigMessage(data),
    random_id
  })

  if (res._ !== 'updates') return

  const update = res.updates.find(update =>
    update._ === 'updateMessageID' && update.random_id === random_id
  ) as Update.updateMessageID | undefined

  if (!update?.id) return

  const folder = { id: update.id, ...data }
  setFeedState('folders', folders => [...folders, folder])
}
