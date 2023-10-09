import type { Service } from '~/shared/service'
import { service } from '~/shared/service'
import { MessageMedia, Document, InputFileLocation } from '~/shared/api/mtproto'
import { loadFilePart } from '~/shared/api/utils/load-file-part'
import { generateFilePartUuid } from '~/shared/api/utils/generate-file-part-uuid'

import type { ChannelId, PostId } from '../feed.types'
import { getFeedCache } from '../feed-cache'
import { getMediaVideo, getMediaAudio } from './detect-post-media'

export const loadStreamFilePart: Parameters<Service['handleStreams']>[0] = async (
  uuid,
  offset,
  limit
) => {
  const feedCache = getFeedCache()
  const { media } = feedCache.posts[uuid]
  const stream = getMediaVideo(media) || getMediaAudio(media)!
  const [channelId, postId] = uuid.split('-').map((value, index) =>
    index ? +value : value
  ) as [ChannelId, PostId]
  const { access_hash: accessHash } = feedCache.channels[channelId]
  const { dc_id } = stream
  const location = getPostStreamLocation(media)
  const filePartUuid = generateFilePartUuid(location, offset, limit)

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

  service.handleStreamFilePartLoad(
    filePartUuid,
    uuid,
    offset,
    limit
  )
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
