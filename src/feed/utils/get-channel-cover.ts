import createSyncTaskQueue from 'sync-task-queue'
import { createStore } from 'solid-js/store'

import { api } from '~/shared/api'
import { getUiWorker } from '~/shared/ui/worker'
import { setDelay } from '~/shared/utils'

import type { ChannelData } from '../feed.types'

type ChannelCover = {
  thumbUrl: string
  coverUrl: string
}

type ChannelCoverCache = {
  [key in ChannelData['id']]: ChannelCover
}

const [channelCoverCache, setChannelCoverCache] = createStore<ChannelCoverCache>({})

const LOADING_PART_SIZE = 1024 * 1024
const LOADING_TIMEOUT = 200
const MAX_LOADING_COUNT = 2

const loadingQueue = {
  nextIndex: 0,

  queues: [...Array(MAX_LOADING_COUNT).keys()].reduce((queue, index) => {
    queue[index] = createSyncTaskQueue()
    return queue
  }, {}),

  add: fn => {
    const currentIndex = loadingQueue.nextIndex
    loadingQueue.queues[currentIndex].enqueue(async () => {
      await fn()
      return setDelay(LOADING_TIMEOUT)
    })
    loadingQueue.nextIndex = currentIndex === MAX_LOADING_COUNT - 1 ? 0 : currentIndex + 1
  }
}

export const getChannelCover = (
  channel: ChannelData,
  {
    visible = false
  }
): ChannelCover => {
  if (channelCoverCache[channel.id]) {
    return channelCoverCache[channel.id]
  }

  if (!visible) {
    return channelCoverCache[channel.id]
  }

  setChannelCoverCache({
    [channel.id]: { thumbUrl: '', coverUrl: '' }
  })

  if (channel.photo._ === 'chatPhotoEmpty') {
    return channelCoverCache[channel.id]
  }

  const { dc_id, photo_id, stripped_thumb } = channel.photo

  if (stripped_thumb) {
    getUiWorker().then(async uiWorker => {
      const thumbUrl = await uiWorker.getImageUrlFromBytes(stripped_thumb, { stripped: true })
      setChannelCoverCache(channel.id, 'thumbUrl', thumbUrl)
    })
  }

  loadingQueue.add(() => loadChannelCover(
    channel.id,
    channel.access_hash,
    dc_id,
    photo_id
  ).then(cover => {
    getUiWorker().then(async uiWorker => {
      if (cover._ !== 'upload.file') return
      const coverUrl = await uiWorker.getImageUrlFromBytes(cover.bytes)
      setChannelCoverCache(channel.id, 'coverUrl', coverUrl)
    })
  }))

  return channelCoverCache[channel.id]
}

const loadChannelCover = async (
  channel_id,
  access_hash,
  dc,
  photo_id
) => api.req('upload.getFile', {
  location: {
    _: 'inputPeerPhotoFileLocation',
    peer: {
      _: 'inputPeerChannel',
      channel_id,
      access_hash
    },
    big: false,
    photo_id
  },
  cdn_supported: false,
  offset: '',
  limit: LOADING_PART_SIZE
}, {
  dc,
  thread: 4
})
