import type { MessagesDialogs, Message } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { Channels } from '../feed.types'
import { setFeedState } from '../feed-state'
import { feedCache } from '../feed-cache'

const LIMIT = 100
let channelsLoaded = false

export const fetchChannels = async () => {
  if (channelsLoaded) return
  channelsLoaded = true
  const channels = await loadChannels()
  feedCache.channels = channels
  setFeedState('channelIds', Object.keys(channels))
}

const loadChannels = async (
  channels: Channels = {},
  offset_date = 0,
): Promise<Channels> => {
  const res = await api.req('messages.getDialogs', {
    offset_peer: {
      _: 'inputPeerEmpty'
    },
    offset_id: 0,
    offset_date,
    limit: LIMIT,
    hash: ''
  })

  if (res._ === 'messages.dialogsNotModified') {
    return channels
  }

  const data = parseChannelsRes(res)

  channels = {
    ...channels,
    ...data.channels
  }

  if (data.date) {
    return loadChannels(
      channels,
      data.date
    )
  }

  return channels
}

const parseChannelsRes = (
  res?: MessagesDialogs
) => {
  const data = {
    channels: {} as Channels,
    date: 0
  }

  if (
    res?._ === 'messages.dialogsNotModified' ||
    !res?.dialogs.length ||
    !res?.chats.length
  ) {
    return data
  }

  const { chats, messages } = res

  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i]

    if (chat._ !== 'channel') continue
    if (
      !chat.broadcast || chat.creator || chat.left ||
      chat.fake || chat.scam || chat.restricted
    ) continue

    data.channels[chat.id] = chat
  }

  const lastMessage = messages.length >= LIMIT && messages.findLast(
    message => !!(message as Message.message).date
  ) as Message.message | null
  data.date = lastMessage && lastMessage.date || 0

  return data
}
