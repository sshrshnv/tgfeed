import type { MessagesMessages, Message } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { ChannelFilter, PostFilter, ConfigMessageParams } from '../feed.types'
import { FEED_CONFIG_MESSAGE_TAG } from '../feed.const'

export const loadConfig = async () => {
  const res = await api.req('messages.search', {
    q: FEED_CONFIG_MESSAGE_TAG,
    peer: {
      _: 'inputPeerSelf'
    },
    filter: {
      _: 'inputMessagesFilterEmpty'
    },
    min_date: 0,
    max_date: 0,
    min_id: 0,
    max_id: 0,
    offset_id: 0,
    add_offset: 0,
    limit: 100,
    hash: ''
  })

  return parseRes(res)
}

const parseRes = (
  res: MessagesMessages
) => {
  const config = {
    channelFilters: [] as ChannelFilter[],
    postFilters: [] as PostFilter[]
  }

  if (res._ === 'messages.messagesNotModified') {
    return config
  }

  for (let i = 0; i < res.messages.length; i++) {
    const message = res.messages[i]
    if (message._ !== 'message') continue

    const params = parseConfigMessage(message)

    if ('channelIds' in params) {
      config.channelFilters.push({
        messageId: message.id,
        ...params
      })
    }
    if ('text' in params) {
      config.postFilters.push({
        messageId: message.id,
        ...params
      })
    }
  }

  return config
}

const parseConfigMessage = (message: Message): ConfigMessageParams => {
  let parsedMessage = {} as ConfigMessageParams

  if (
    message._ !== 'message' ||
    !message.message.startsWith(FEED_CONFIG_MESSAGE_TAG)
  ) return parsedMessage

  try {
    parsedMessage = JSON.parse(message.message.replace(FEED_CONFIG_MESSAGE_TAG, '').trim())
  } finally {
    return parsedMessage
  }
}
