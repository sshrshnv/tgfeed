import { api } from '~/shared/api'

import type { Channel } from '../channels'
import { normalizeChannel } from '../channels/utils'

let offset_date = 0

export const loadChannels = async (): Promise<Channel[]> => {
  const channels: Channel[] = []

  const res = await api.req('messages.getDialogs', {
    offset_peer: {
      _: 'inputPeerEmpty'
    },
    offset_id: 0,
    offset_date,
    limit: 100,
    hash: ''
  })

  if (res._ === 'messages.dialogsNotModified') {
    return channels
  }

  const { messages, chats } = res

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]

    if (message._ !== 'message') continue
    if (message.date < maxMessageDate) break
    if (message.peer_id._ !== 'peerChannel') continue

    const { channel_id } = message.peer_id
    const channel = chats.find(chat => chat.id === channel_id)

    if (channel) channels.push(normalizeChannel(channel))
  }

  return channels
}
