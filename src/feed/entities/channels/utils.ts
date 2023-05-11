import type { Chat } from '~/shared/api-worker/mtproto'

import type { Channel } from './types'

export const isChatMatchedWithChannel = (chat: Chat, { strict = false } = {}) => (
  chat._ === 'channel' && (strict ?
    (!chat.restricted && !chat.fake && !chat.scam) :
    true
  )
)

export const normalizeChatIntoChannel = (chat: Chat): Channel => {
  const channel = chat as unknown as Channel
  channel.uuid = chat.id

  return channel
}
