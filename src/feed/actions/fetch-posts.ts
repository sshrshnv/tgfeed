import { batch } from 'solid-js'

import { api } from '~/shared/api'

import type { FeedCache, FeedState, PostUuids, PostGroups } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'
import { setFeedCache } from '../feed-cache'
import { loadConfig } from '../utils/load-config'
import { resolveCurrentFolderState } from '../utils/resolve-current-folder-state'
import { parsePostMessages } from '../utils/parse-post-messages'

type Data = {
  postUuids: FeedState['postUuids']
  channels: FeedCache['channels']
  posts: FeedCache['posts']
  postGroups: FeedState['postGroups']
  next: boolean
}

let offset_rate: number | undefined = 0
let initialLoading = true

export const fetchPosts = async (pageNumber: number | true) => {
  const res = { next: false }

  if (initialLoading) {
    const [
      { config, folders, filters },
      { postUuids, channels, posts, postGroups, next }
    ] = await Promise.all([
      loadConfig(),
      loadPosts({ next: false })
    ])

    if (!folders.some(folder => folder.id === feedState.currentFolderId)) {
      resolveCurrentFolderState(feedState, config, folders)
    }

    setFeedCache({ channels, posts })
    batch(() => {
      setFeedState({ ...config, folders, filters, postGroups, postUuids })
      setFeedState('initialLoading', false)
    })

    initialLoading = false
    res.next = next
  }
  else {
    const { postUuids, channels, posts, postGroups, next } = await loadPosts({ next: !!pageNumber })
    const postGroupsUpdate = getPostGroupsUpdate(feedState.postGroups, postGroups)
    const postUuidsUpdate = getPostUuidsUpdate(feedState.postUuids, postUuids)

    setFeedCache({ channels, posts })
    batch(() => {
      setFeedState('postGroups', postGroupsUpdate)
      setFeedState('postUuids', postUuidsUpdate)
    })

    res.next = next
  }

  return res
}

const loadPosts = async ({ next = false } = {}): Promise<Data> => {
  if (!next) {
    offset_rate = 0
  }
  if (typeof offset_rate === 'undefined') {
    return parsePostMessages()
  }

  const res = await api.req('messages.searchGlobal', {
    q: '',
    filter: {
      _: 'inputMessagesFilterEmpty'
    },
    offset_peer: {
      _: 'inputPeerEmpty'
    },
    min_date: 0,
    max_date: 0,
    offset_id: 0,
    limit: 100,
    offset_rate
  })

  const data = parsePostMessages(res)

  if ('next_rate' in res) {
    data.next = true
    offset_rate = res.next_rate
  } else {
    offset_rate = undefined
  }

  if (!data.postUuids.length && offset_rate) {
    return loadPosts({ next: true })
  }

  return data
}

const getPostUuidsUpdate = (
  state: PostUuids,
  postUuids: PostUuids
) => [...new Set([
  ...(state || []),
  ...postUuids
])]

const getPostGroupsUpdate = (
  state: PostGroups,
  postGroups: PostGroups
) => Object.entries(postGroups).reduce((obj, [key, values]) => {
  obj[key] = [...values, ...(state?.[key] || [])]
  return obj
}, {} as PostGroups)
