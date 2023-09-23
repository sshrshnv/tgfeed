import type { MessagesMessages, Message } from '~/shared/api/mtproto'

import type {
  FeedCache, FeedState, ChannelData, ChannelId,
  PostData, PostUuid
} from '../feed.types'
import { generatePostUuid, generatePostGroupUuid } from './generate-post-uuid'
import { isSupportedMedia } from './detect-post-media'

export const parsePostMessages = (
  res?: Partial<MessagesMessages>
) => {
  const data = {
    postUuids: [] as FeedState['postUuids'],
    channels: {} as FeedCache['channels'],
    posts: {} as FeedCache['posts'],
    postGroups: {} as FeedState['postGroups'],
    next: false
  }

  if (!res || !('messages' in res)) {
    return data
  }

  for (let i = 0; i < res.messages!.length; i++) {
    const post = res.messages![i] as PostData
    const postUuid: PostUuid = generatePostUuid(post)
    const channelId: ChannelId = post.peer_id.channel_id

    if (!isValidPost(post)) continue

    if (post.grouped_id) {
      const postGroupUuid = generatePostGroupUuid(post)

      if (!data.postGroups[postGroupUuid]) {
        data.postGroups[postGroupUuid] = []
        data.postUuids.push(postGroupUuid)
      }

      data.postGroups[postGroupUuid].unshift(postUuid)
    } else {
      data.postUuids.push(postUuid)
    }
    data.posts[postUuid] = post

    if (!data.channels.channelId) {
      const channel = res.chats!.find(chat => chat.id === channelId) as ChannelData
      data.channels[channelId] = channel
    }
  }

  return data
}

const isValidPost = (message: Message) => !!(
  message._ === 'message' &&
  message.peer_id._ === 'peerChannel' &&
  message.post &&
  !message.out && (
    message.message ||
    isSupportedMedia(message.media)
  )
)
