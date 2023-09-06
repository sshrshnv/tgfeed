import { createStore } from 'solid-js/store'
import { comlink } from '~/shared/utils/comlink'

import { MessageMedia, Document, InputFileLocation } from '~/shared/api/mtproto'
import { generateFileUuid } from '~/shared/api/utils/generate-file-uuid'
import { generateFilePartUuid } from '~/shared/api/utils/generate-file-part-uuid'
import { loadFilePart } from '~/shared/api/utils/load-file-part'
import { service } from '~/shared/service'

import type { PostUuid, ChannelId, PostId } from '../feed.types'
import { feedState } from '../feed-state'
import { getMediaVideo, getMediaAudio } from './detect-post-media'

type StreanUrlsCache = Record<string, string>

const [streamUrlsCache, setStreamUrlCache] = createStore<StreanUrlsCache>({})

export const getPostStreamUrl = (
  uuid: PostUuid,
  media: MessageMedia
) => {
  const stream = getMediaVideo(media) || getMediaAudio(media)!
  const [channelId, postId] = uuid.split('-').map((value, index) =>
    index ? +value : value
  ) as [ChannelId, PostId]
  const { access_hash: accessHash } = feedState.channels[channelId]
  const { size, mime_type, dc_id } = stream
  const location = getPostStreamLocation(media)
  const fileUuid = generateFileUuid(location)

  if (typeof streamUrlsCache[fileUuid] === 'string') {
    return streamUrlsCache[fileUuid]
  } else {
    setStreamUrlCache({
      [fileUuid]: ''
    })
  }

  const loadStreamFilePart = async (
    offset,
    limit
  ) => {
    await loadFilePart(
      channelId,
      accessHash,
      postId,
      location,
      dc_id,
      2,
      offset,
      limit
    )

    const filePartUuid = generateFilePartUuid(location, offset)
    return filePartUuid
  }

  service.getStreamUrl(
    {
      fileUuid,
      fileSize: parseInt(size, 16),
      fileType: mime_type
    },
    comlink.proxy(loadStreamFilePart)
  ).then(url => {
    setStreamUrlCache(fileUuid, url)
  })
}

const getPostStreamLocation = (
  media: MessageMedia
) => {
  const stream = getMediaVideo(media) || getMediaAudio(media) as Document.document

  const { id, access_hash, file_reference } = stream

  const location: InputFileLocation = {
    _: 'inputDocumentFileLocation',
    id,
    access_hash,
    file_reference,
    thumb_size: ''
  }

  return location
}
