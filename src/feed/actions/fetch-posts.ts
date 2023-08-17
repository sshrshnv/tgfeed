import type { MessagesMessages, Message } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { FeedState, Channels, ChannelData, Posts, PostData } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { setFeedState } from '../feed-state'
import { resolveCurrentFolderState } from '../utils'
import { loadConfig } from './load-config'

type Data = {
  postUuids: PostData['uuid'][]
  channels: Channels
  posts: Posts
  next: boolean
}

let offset_rate: number | undefined = 0
let initialLoading = true

export const fetchPosts = async (pageNumber: number) => {
  const res = { next: false }

  if (initialLoading) {
    const [
      { config, folders, filters },
      { postUuids, channels, posts, next }
    ] = await Promise.all([
      loadConfig(),
      loadPosts({ next: false })
    ])

    setFeedState(state => {
      const stateUpdates: Partial<FeedState> = {
        ...config,
        initialLoading: false,
        postUuids,
        channels,
        posts,
        folders,
        filters,
      }

      if (
        state.currentFolderId !== DEFAULT_FOLDER_ID &&
        !folders.some(folder => folder.id === state.currentFolderId)
      ) {
        resolveCurrentFolderState(state, stateUpdates)
      }

      return stateUpdates
    })
    initialLoading = false
    res.next = next
  } else {
    const { postUuids, channels, posts, next } = await loadPosts({ next: !!pageNumber })

    setFeedState(state => ({
      postUuids: pageNumber ? [...state.postUuids, ...postUuids] : postUuids,
      channels,
      posts
    }))

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
    postUuids: [] as PostData['uuid'][],
    channels: {} as Channels,
    posts: {} as Posts,
    next: false
  }

  if (!res || !('messages' in res)) {
    return data
  }

  for (let i = 0; i < res.messages.length; i++) {
    const post = res.messages[i] as PostData
    const postUuid: PostData['uuid'] = `${post.peer_id.channel_id}-${post.id}`
    const channelId: ChannelData['id'] = post.peer_id.channel_id

    if (!isValidPost(post)) continue

    data.postUuids.push(postUuid)
    data.posts[postUuid] = post

    if (!data.channels.channelId) {
      const channel = res.chats.find(chat => chat.id === channelId) as ChannelData
      data.channels[channelId] = channel
    }
  }

  return data
}

const isValidPost = (message: Message) => (
  message._ === 'message' &&
  message.peer_id._ === 'peerChannel' &&
  !!message.post
)
