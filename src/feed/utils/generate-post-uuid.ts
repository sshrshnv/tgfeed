import type { PostData, PostUuid, PostGroupUuid } from '../feed.types'

export const generatePostUuid = (post: PostData): PostUuid =>
  `${post.peer_id.channel_id}-${post.id}`

export const generatePostGroupUuid = (post: PostData): PostGroupUuid =>
  `${post.peer_id.channel_id}-${post.grouped_id}`

export const isPostGroupUuid = (uuid: PostUuid | PostGroupUuid) => {
  const groupUuid = uuid.split('-')[1]
  return self.isNaN(+groupUuid) || `${+groupUuid}` !== groupUuid
}
