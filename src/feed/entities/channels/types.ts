import type { Chat } from '~/shared/api-worker/mtproto'

export type Channel = Chat.channel & {
  uuid: Chat.channel['id']
}

export type ChannelsDBSchema = {
  key: Channel['uuid']
  value: Channel
}
