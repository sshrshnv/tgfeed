import type { Chat, Message, Peer } from '~/shared/api/mtproto'

export type FeedState = Config & {
  initialLoading: boolean
  currentFolderId: Folder['id']
  postUuids: PostData['uuid'][]
  folders: Folder[]
  filters: Filter[]
  channels: Channels
  posts: Posts
}

export type Config = {
  configId?: Message.message['id']
  defaultFolderVisibility: boolean
}

export type FeedStorage = {
  state: { feedState: FeedState }
}

export type Channels = {
  [id in ChannelData['id']]: ChannelData
}

export type ChannelData = Chat.channel

export type Posts = {
  [uuid in PostData['uuid']]: PostData
}

export type PostData = Omit<Message.message, 'peer_id'> & {
  uuid: `${Peer.peerChannel['channel_id']}-${Message.message['id']}`
  peer_id: Peer.peerChannel
}

export type Folder = {
  id: Message.message['id']
  index: number
  name: string
  channelIds: ChannelData['id'][]
}

export type Filter = {
  id: Message.message['id']
  text: string
  part?: boolean
}

export type ConfigMessageParams = (
  | Config
  | Omit<Folder, 'id'>
  | Omit<Filter, 'id'>
)
