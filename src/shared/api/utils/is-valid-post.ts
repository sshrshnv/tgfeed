import type { Message, MessageMedia } from '../mtproto'
import { SUPPORTED_MEDIA_DOCUMENT_TYPES } from '../api.const'

export const isValidPost = (message: Message) => !!(
  message._ === 'message' &&
  message.peer_id._ === 'peerChannel' &&
  message.post &&
  !message.out && (
    message.message ||
    isSupportedMedia(message.media)
  )
)

export const isSupportedMedia = (media?: MessageMedia) => media && ((
  media._ === 'messageMediaPhoto' &&
  media.photo?._ === 'photo'
) || (
  media._ === 'messageMediaDocument' &&
  media.document?._ === 'document' &&
  SUPPORTED_MEDIA_DOCUMENT_TYPES.includes(media.document.attributes[0]._)
))
