import type { PostUuid } from '../feed.types'
import { feedCache } from '../feed-cache'

export const getPost = (uuid: PostUuid) =>
  feedCache.posts[uuid]

export const getPostChannel = (uuid: PostUuid) =>
  feedCache.channels[getPost(uuid).peer_id.channel_id]
