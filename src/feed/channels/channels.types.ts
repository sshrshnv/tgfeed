import type { Chat } from '~/shared/api/mtproto'

export type Channel = Chat.channel & {
  uuid: Chat.channel['id']
}

export type Channels = {
  [key in Channel['uuid']]: Channel
}

export type ChannelsDBSchema = {
  channels: {
    key: Channel['uuid']
    value: Channel
  }
}
