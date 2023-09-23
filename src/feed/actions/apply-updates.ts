import { batch } from 'solid-js'

import type { PostUuids } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'

export const applyUpdates = () => {
  const newPostUuidsUpdate = []
  const postUuidsUpdate = getPostUuidsUpdate(feedState.postUuids, feedState.newPostUuids)

  batch(() => {
    setFeedState('postUuids', postUuidsUpdate)
    setFeedState('newPostUuids', newPostUuidsUpdate)
  })
}

const getPostUuidsUpdate = (
  state: PostUuids,
  postUuids: PostUuids
) => [...new Set([
  ...postUuids,
  ...(state || [])
])]
