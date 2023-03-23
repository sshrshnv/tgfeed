import type { Message, Peer } from '~/shared/api-worker/mtproto'

import type { Post } from './types'

export const isMessageMatchedWithPost = (message: Message) => (
  message._ === 'message' &&
  message.peer_id._ === 'peerChannel' &&
  message.post
)

export const normalizeMessageIntoPost = (message: Message): Post => {
  const post = message as unknown as Post
  const peer = message.peer_id as Peer.peerChannel

  post.uuid = `${message.id}-${peer.channel_id}`
  post.peer = peer
  post.peer_id = peer.channel_id

  return post
}
