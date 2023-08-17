import type { MessagesMessages } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { Config, Folder, Filter } from '../feed.types'
import { FEED_CONFIG_MESSAGE_TAG } from '../feed.const'
import { parseConfigMessage } from '../utils'

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

  return parseConfigRes(res)
}

const parseConfigRes = (
  res: MessagesMessages
) => {
  const parsedRes = {
    config: {} as Config,
    folders: [] as Folder[],
    filters: [] as Filter[]
  }

  if (res._ === 'messages.messagesNotModified') {
    return parsedRes
  }

  for (let i = 0; i < res.messages.length; i++) {
    const message = res.messages[i]

    if (message._ !== 'message') continue

    const params = parseConfigMessage(message)

    if ('configId' in params && typeof params.configId === 'number') {
      parsedRes.config.configId = message.id

      if ('defaultFolderVisibility' in params && typeof params.defaultFolderVisibility === 'boolean') {
        parsedRes.config.defaultFolderVisibility = params.defaultFolderVisibility
      }
    }

    if (
      'name' in params && typeof params.name === 'string' &&
      'channelIds' in params && Array.isArray(params.channelIds)
    ) {
      parsedRes.folders.push({
        id: message.id,
        index: params.index || 0,
        name: params.name,
        channelIds: params.channelIds
      })
    }

    if ('text' in params) {
      parsedRes.filters.push({
        id: message.id,
        ...params
      })
    }
  }

  parsedRes.folders.sort(
    (folder1, folder2) => folder1.index - folder2.index
  )

  return parsedRes
}
