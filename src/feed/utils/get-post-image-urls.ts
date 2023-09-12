import { createStore } from 'solid-js/store'

import { InputFileLocation, MessageMedia, Photo, PhotoSize, Document } from '~/shared/api/mtproto'
import { generateFileUuid } from '~/shared/api/utils/generate-file-uuid'
import { getUiWorker } from '~/shared/ui/worker/init-ui-worker'

import type { PostUuid, ChannelId, PostId } from '../feed.types'
import { feedCache } from '../feed-cache'
import { loadFile, pauseFileLoading, isFileLoadingPaused } from './load-file'
import { getMediaImage, getMediaVideo, getMediaAudio, getMediaImageSize } from './detect-post-media'

type ImageUrls = {
  thumbUrl: string
  imageUrl: string
}

type ImageUrlsCache = Record<string, ImageUrls>

const [imageUrlsCache, setImageUrlsCache] = createStore<ImageUrlsCache>({})

const defaultPostImageUrls = {
  thumbUrl: '',
  imageUrl: ''
}

export const getPostImageUrls = (
  uuid: PostUuid,
  media: MessageMedia
): ImageUrls => {
  const image = getMediaImage(media) || getMediaVideo(media) || getMediaAudio(media)
  if (!image) return defaultPostImageUrls

  const [channelId, postId] = uuid.split('-').map((value, index) =>
    index ? +value : value
  ) as [ChannelId, PostId]
  const { access_hash: accessHash } = feedCache.channels[channelId]
  const { id, dc_id } = image
  const { thumbs = [] } = image as Document.document
  const { sizes = thumbs } = image as Photo.photo
  const strippedThumb = sizes.find(size => size._ === 'photoStrippedSize') as PhotoSize.photoStrippedSize
  const size = getMediaImageSize(media) as PhotoSize.photoSize
  const location = getPostImageLocation(media)
  const fileUuid = generateFileUuid(location || { id })

  if (imageUrlsCache[fileUuid] && !isFileLoadingPaused(location)) {
    return imageUrlsCache[fileUuid]
  }

  if (!imageUrlsCache[fileUuid]) {
    setImageUrlsCache({
      [fileUuid]: { thumbUrl: '', imageUrl: '' }
    })
  }

  if (!imageUrlsCache[fileUuid].thumbUrl && strippedThumb) {
    getUiWorker().then(async uiWorker => {
      const thumbUrl = await uiWorker.getThumbUrlFromBytes(strippedThumb.bytes, { stripped: true })
      setImageUrlsCache(fileUuid, 'thumbUrl', thumbUrl)
    })
  }

  if (!location) {
    return imageUrlsCache[fileUuid]
  }

  loadFile(
    channelId,
    accessHash!,
    postId,
    location,
    dc_id,
    size?.size
  ).then(async file => {
    if (!file) return

    const uiWorker = await getUiWorker()
    const imageUrl = await uiWorker.getMediaUrlFromFile(file)
    if (!imageUrl) return

    setImageUrlsCache(fileUuid, 'imageUrl', imageUrl)
  })

  return imageUrlsCache[fileUuid]
}

export const pausePostImageLoading = (
  media: MessageMedia
) => {
  const location = getPostImageLocation(media)
  if (!location) return
  pauseFileLoading(location)
}

const getPostImageLocation = (
  media: MessageMedia
) => {
  const image = getMediaImage(media) || getMediaVideo(media) || getMediaAudio(media)!

  const { id, access_hash, file_reference } = image
  const type = image._ === 'photo' ? 'inputPhotoFileLocation' : 'inputDocumentFileLocation'
  const size = getMediaImageSize(media) as PhotoSize

  if (!size) return

  const location: InputFileLocation = {
    _: type,
    id,
    access_hash,
    file_reference,
    thumb_size: size.type
  }

  return location
}
