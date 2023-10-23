import { createStore } from 'solid-js/store'

import type { InputFileLocation } from '~/shared/api/mtproto'
import { ui } from '~/shared/ui'

import type { ChannelData, ChannelId } from '../feed.types'
import { loadFile } from './load-file'

type ChannelCoverUrls = {
  thumbUrl: string
  coverUrl: string
}

type ChannelCoverUrlsCache = {
  [key in ChannelId]: ChannelCoverUrls
}

const [channelCoverUrlsCache, setChannelCoverUrlsCache] = createStore<ChannelCoverUrlsCache>({})

export const getChannelCoverUrls = (
  channel: ChannelData
): ChannelCoverUrls => {
  if (channelCoverUrlsCache[channel.id]) {
    return channelCoverUrlsCache[channel.id]
  }

  setChannelCoverUrlsCache({
    [channel.id]: { thumbUrl: '', coverUrl: '' }
  })

  if (channel.photo._ === 'chatPhotoEmpty') {
    return channelCoverUrlsCache[channel.id]
  }

  const { dc_id, photo_id, stripped_thumb } = channel.photo

  if (stripped_thumb) {
    ui.getThumbUrlFromBytes(stripped_thumb, { stripped: true }).then(thumbUrl => {
      setChannelCoverUrlsCache(channel.id, 'thumbUrl', thumbUrl)
    })
  }

  loadChannelCoverFile(
    channel.id,
    channel.access_hash,
    dc_id,
    photo_id
  ).then(async file => {
    if (!file) return

    const coverUrl = await ui.getMediaUrlFromFile(file)
    if (!coverUrl) return

    setChannelCoverUrlsCache(channel.id, 'coverUrl', coverUrl)
  })

  return channelCoverUrlsCache[channel.id]
}

const loadChannelCoverFile = async (
  channel_id,
  access_hash,
  dc,
  photo_id
) => {
  const location: InputFileLocation = {
    _: 'inputPeerPhotoFileLocation',
    peer: {
      _: 'inputPeerChannel',
      channel_id,
      access_hash
    },
    big: false,
    photo_id
  }

  return loadFile(
    channel_id,
    access_hash,
    0,
    location,
    dc
  )
}
