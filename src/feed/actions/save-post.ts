import type { Message, Chat } from '~/shared/api/mtproto'
import { api } from '~/shared/api'
import { generateRandomId } from '~/shared/api/utils/generate-random-id'

export const savePost = (
  id: Message.message['id'],
  channel: Chat.channel
) => {
  const random_id = generateRandomId()
  return api.req('messages.forwardMessages', {
    id: [id],
    from_peer: {
      _: 'inputPeerChannel',
      channel_id: channel.id,
      access_hash: channel.access_hash!
    },
    to_peer: {
      _: 'inputPeerSelf'
    },
    random_id: [random_id]
  })
}
