import type { Message } from '~/shared/api/mtproto'

import type { ConfigMessageParams } from '../feed.types'
import { FEED_CONFIG_MESSAGE_TAG } from '../feed.const'

export const parseConfigMessage = (message: Message): ConfigMessageParams => {
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
