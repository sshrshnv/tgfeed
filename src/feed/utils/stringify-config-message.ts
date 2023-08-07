import type { ConfigMessageParams } from '../feed.types'
import { FEED_CONFIG_MESSAGE_TAG } from '../feed.const'

export const stringifyConfigMessage = (data: ConfigMessageParams) =>
  `${FEED_CONFIG_MESSAGE_TAG} ${JSON.stringify(data)}`
