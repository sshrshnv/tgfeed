import type { MessagesMessages, Message } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { FeedState, Channels, ChannelData, Posts, PostData, Folder, Filter } from '../feed.types'
import { FEED_CONFIG_MESSAGE_TAG, DEFAULT_FOLDER_ID } from '../feed.const'
import { setFeedState } from '../feed-state'
import { parseConfigMessage, resolveCurrentFolderState } from '../utils'

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
      { folders, filters },
      { postUuids, channels, posts, next }
    ] = await Promise.all([
      loadConfig(),
      loadPosts({ next: false })
    ])
    setFeedState(state => {
      const stateUpdates: Partial<FeedState> = {
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

const loadConfig = async () => {
  const res = await api.req('messages.search', {
    q: FEED_CONFIG_MESSAGE_TAG,
    peer: {
      _: 'inputPeerSelf'
    },
    filter: {
      _: 'inputMessagesFilterEmpty'
    },
    min_date: 0,
    max_date: 0,
    min_id: 0,
    max_id: 0,
    offset_id: 0,
    add_offset: 0,
    limit: 100,
    hash: ''
  })

  return parseConfigRes(res)
}

const parseConfigRes = (
  res: MessagesMessages
) => {
  const config = {
    folders: [] as Folder[],
    filters: [] as Filter[]
  }

  if (res._ === 'messages.messagesNotModified') {
    return config
  }

  for (let i = 0; i < res.messages.length; i++) {
    const message = res.messages[i]
    if (message._ !== 'message') continue

    const params = parseConfigMessage(message)

    if (
      'name' in params && typeof params.name === 'string' &&
      'channelIds' in params && Array.isArray(params.channelIds)
    ) {
      config.folders.push({
        id: message.id,
        index: params.index || 0,
        name: params.name,
        channelIds: params.channelIds
      })
    }
    if ('text' in params) {
      config.filters.push({
        id: message.id,
        ...params
      })
    }
  }

  config.folders.sort(
    (folder1, folder2) => folder1.index - folder2.index
  )

  return config
}
