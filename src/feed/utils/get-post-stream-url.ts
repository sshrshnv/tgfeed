import type { MessageMedia } from '~/shared/api/mtproto'
import { SERVICE_STREAM_URL } from '~/shared/service/service.const'

import type { PostUuid } from '../feed.types'
import { getMediaVideo, getMediaAudio } from './detect-post-media'

export const getPostStreamUrl = (
  uuid: PostUuid,
  media: MessageMedia
) => {
  const stream = getMediaVideo(media) || getMediaAudio(media)!
  const params = {
    uuid,
    s: `${parseInt(stream.size, 16)}`,
    t: stream.mime_type
  }
  return `${SERVICE_STREAM_URL}?${new URLSearchParams(params).toString()}`
}
