import type { Chat, Message, Peer } from '~/shared/api/mtproto'

export type FeedState = Config & {
  initialLoading: boolean
  streamsHandlerActivated: boolean
  postUuids: PostUuids
  newPostUuids: PostUuids
  channelIds: ChannelId[]
  folders: Folder[]
  filters: Filter[]
  postGroups: PostGroups
  fontSize: FontSize
  scrolling: Scrolling
}

export type FeedCache = {
  _channels: Channels
  _posts: Posts
  get channels(): Channels
  get posts(): Posts
}

export type Config = {
  configId?: Message.message['id']
  currentFolderId?: Folder['id']
  defaultFolderVisibility: boolean
}

export type FeedStorage = {
  state: { feedState: FeedState }
}

export type Channels = {
  [id in ChannelId]: ChannelData
}

export type ChannelData = Chat.channel

export type ChannelId = ChannelData['id']

export type Posts = {
  [uuid in PostUuid]: PostData
}

export type PostData = Omit<Message.message, 'peer_id'> & {
  uuid: PostUuid
  peer_id: Peer.peerChannel
}

export type PostId = PostData['id']

export type PostUuid = `${Peer.peerChannel['channel_id']}-${Message.message['id']}`

export type PostGroupUuid = `${Peer.peerChannel['channel_id']}-${string}`

export type UncertainPostUuid = PostUuid | PostGroupUuid

export type PostUuids = UncertainPostUuid[]

export type PostGroups = {
  [postGroupUuid in PostGroupUuid]: PostUuid[]
}

export type Folder = {
  id: Message.message['id']
  index: number
  name: string
  channelIds: ChannelId[]
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

export type FontSize = 'large' | 'medium' | 'small'

export type Scrolling = {
  [folderId in Folder['id']]: ScrollingValue
}

export type ScrollingValue = -2 | -1 | 0 | 1 | 2
