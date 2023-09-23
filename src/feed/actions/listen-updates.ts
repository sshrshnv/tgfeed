import { batch } from 'solid-js'

import { api } from '~/shared/api'

import type { PostUuids, PostGroups } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'
import { setFeedCache } from '../feed-cache'
import { parsePostMessages } from '../utils/parse-post-messages'

export const listenUpdates = () => {
  api.listenUpdates((res) => {
    const data = parsePostMessages(res)
    const { postUuids, channels, posts, postGroups } = data

    const postGroupsUpdate = getPostGroupsUpdate(feedState.postGroups, postGroups)
    const postUuidsUpdate = getPostUuidsUpdate(feedState.newPostUuids, postUuids)

    setFeedCache({ channels, posts })
    batch(() => {
      setFeedState('postGroups', postGroupsUpdate)
      setFeedState('newPostUuids', postUuidsUpdate)
    })
  })
}

const getPostUuidsUpdate = (
  state: PostUuids,
  postUuids: PostUuids
) => [...new Set([
  ...postUuids,
  ...(state || [])
])]

const getPostGroupsUpdate = (
  state: PostGroups,
  postGroups: PostGroups
) => Object.entries(postGroups).reduce((obj, [key, values]) => {
  obj[key] = [...values, ...(state?.[key] || [])]
  return obj
}, {} as PostGroups)
