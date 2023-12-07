import type { PostUuid } from '../feed.types'

import { setFeedState } from '../feed-state'

let markedAsReadPostsUpdate = {}

export const markPostAsRead = (
  postUuid: PostUuid
) => {
  if (markedAsReadPostsUpdate[postUuid]) return
  markedAsReadPostsUpdate[postUuid] = true
}

export const markPostsAsRead = () => {
  setFeedState('markedAsReadPosts', markedAsReadPostsUpdate)
  markedAsReadPostsUpdate = {}
}
