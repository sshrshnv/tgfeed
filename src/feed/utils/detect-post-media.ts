import type { MessageMedia, PhotoSize, DocumentAttribute } from '~/shared/api/mtproto'

import { SUPPORTED_MEDIA_DOCUMENT_TYPES } from '../feed.const'

const getMediaPhoto = (media: MessageMedia) => (
  media._ === 'messageMediaPhoto' &&
  media.photo?._ === 'photo' &&
  media.photo
) || undefined

const getMediaDocument = (media: MessageMedia) => (
  media?._ === 'messageMediaDocument' &&
  media.document?._ === 'document' &&
  media.document
) || undefined

const getMediaDocumentType = (media: MessageMedia) => (
  getMediaDocument(media)?.attributes[0]._
)

export const getMediaImage = (media: MessageMedia) => (
  getMediaPhoto(media)
) || (
  getMediaDocumentType(media) === 'documentAttributeImageSize' &&
  getMediaDocument(media)
) || undefined

export const isMediaImage = (media: MessageMedia) => !!getMediaImage(media)

export const getMediaVideo = (media: MessageMedia) => (
  getMediaDocumentType(media) === 'documentAttributeVideo' &&
  getMediaDocument(media)
) || undefined

export const isMediaVideo = (media: MessageMedia) => !!getMediaVideo(media)

export const getMediaAudio = (media: MessageMedia) => (
  getMediaDocumentType(media) === 'documentAttributeAudio' &&
  getMediaDocument(media)
) || undefined

export const isMediaAudio = (media: MessageMedia) => !!getMediaAudio(media)

export const getMediaImageSize = (media: MessageMedia) => {
  const document = getMediaDocument(media)
  const photo = getMediaPhoto(media)

  let size = (photo?.sizes || document?.thumbs)?.findLast(size =>
    ['photoSizeProgressive', 'photoSize'].includes(size._)
  ) as PhotoSize.photoSizeProgressive | PhotoSize.photoSize | undefined

  if (size?._ === 'photoSizeProgressive') {
    size = {
      ...size,
      _: 'photoSize',
      size: Math.max(...size.sizes)
    } as PhotoSize.photoSize
  }

  return size
}

export const getMediaVideoSize = (media: MessageMedia) => {
  const document = getMediaDocument(media)

  const size = document?.attributes?.find(attribute =>
    ['documentAttributeVideo', 'documentAttributeImageSize'].includes(attribute._)
  ) as DocumentAttribute.documentAttributeImageSize | DocumentAttribute.documentAttributeVideo | undefined

  return size
}

export const getMediaAspectRatio = (media: MessageMedia) => {
  const size = getMediaImageSize(media)
  return size ? (size.w / size.h) : 0
}

export const isSupportedMedia = (media?: MessageMedia) => media && ((
  media._ === 'messageMediaPhoto' &&
  media.photo?._ === 'photo'
) || (
  media._ === 'messageMediaDocument' &&
  media.document?._ === 'document' &&
  SUPPORTED_MEDIA_DOCUMENT_TYPES.includes(media.document.attributes[0]._)
))
