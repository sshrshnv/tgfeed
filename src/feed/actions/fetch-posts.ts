import { batch } from 'solid-js'

import type { MessagesMessages, Message } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type {
  FeedCache, FeedState, ChannelData, ChannelId,
  PostData, PostUuid, PostUuids, PostGroups
} from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState, setFeedState } from '../feed-state'
import { setFeedCache } from '../feed-cache'
import { resolveCurrentFolderState } from '../utils/resolve-current-folder-state'
import { generatePostUuid, generatePostGroupUuid } from '../utils/generate-post-uuid'
import { loadConfig } from '../utils/load-config'
import { isSupportedMedia } from '../utils/detect-post-media'

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

    if (
      feedState.currentFolderId !== DEFAULT_FOLDER_ID &&
      !folders.some(folder => folder.id === feedState.currentFolderId)
    ) {
      resolveCurrentFolderState(feedState, config)
    }

    setFeedCache({ channels, posts })
    batch(() => {
      setFeedState('configId', config.configId)
      setFeedState('defaultFolderVisibility', config.defaultFolderVisibility)
      setFeedState('folders', folders)
      setFeedState('filters', filters)
      setFeedState('postGroups', postGroups)
      setFeedState('postUuids', postUuids)
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
    return parsePostsRes()
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

  const data = parsePostsRes(res)

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

const parsePostsRes = (
  res?: MessagesMessages
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

  for (let i = 0; i < res.messages.length; i++) {
    const post = res.messages[i] as PostData
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
      const channel = res.chats.find(chat => chat.id === channelId) as ChannelData
      data.channels[channelId] = channel
    }
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

const isValidPost = (message: Message) => !!(
  message._ === 'message' &&
  message.peer_id._ === 'peerChannel' &&
  message.post &&
  !message.out && (
    message.message ||
    isSupportedMedia(message.media)
  )
)
