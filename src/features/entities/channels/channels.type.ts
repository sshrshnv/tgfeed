import type { Chat } from '~/api/mtproto'

export type ChannelData = Chat.channel

export type ChannelsData = {
  [K in ChannelData['id']]: ChannelData
}
