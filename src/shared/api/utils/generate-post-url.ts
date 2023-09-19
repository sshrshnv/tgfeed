import type { Message, Chat } from '~/shared/api/mtproto'

const TELEGRAM_URL = 'https://t.me'

export const generatePostUrl = (
  id: Message.message['id'],
  channel: Chat.channel
) => `${TELEGRAM_URL}/${channel.username || `c/${parseInt(channel.id, 16)}`}/${id}`
