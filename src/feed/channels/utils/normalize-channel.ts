import type { Chat } from '~/shared/api/mtproto'

import type { Channel } from '../channels.types'

export const isMatchedWithChannel = (chat: Chat, { strict = false } = {}) => (
  chat._ === 'channel' && (strict ?
    (!chat.restricted && !chat.fake && !chat.scam) :
    true
  )
)

export const normalizeChannel = (chat: Chat): Channel => {
  const channel = chat as unknown as Channel
  channel.uuid = chat.id

  return channel
}
