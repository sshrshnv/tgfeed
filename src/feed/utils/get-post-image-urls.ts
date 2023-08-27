import { createStore } from 'solid-js/store'

import { InputFileLocation, MessageMedia, Photo, PhotoSize, Document } from '~/shared/api/mtproto'
import { getUiWorker } from '~/shared/ui/worker'

import type { PostUuid } from '../feed.types'
import { loadFile, pauseFileLoading, isFileLoadingPaused } from './load-file'
import { getMediaImage, getMediaVideo, getMediaImageSize } from './detect-post-media'

type ImageUrls = {
  thumbUrl: string
  imageUrl: string
}

type ImageUrlsCache = {
  [key in (Photo.photo['id'] | Document.document['id'])]: ImageUrls
}

const [imageUrlsCache, setImageUrlsCache] = createStore<ImageUrlsCache>({})

export const getPostImageUrls = (
  uuid: PostUuid,
  media: MessageMedia
): ImageUrls => {
  const image = getMediaImage(media) || getMediaVideo(media)!

  const { id, dc_id } = image
  const { thumbs = [] } = image as Document.document
  const { sizes = thumbs } = image as Photo.photo
  const strippedThumb = sizes.find(size => size._ === 'photoStrippedSize') as PhotoSize.photoStrippedSize
  const location = getPostImageLocation(media)

  if (imageUrlsCache[image.id] && !isFileLoadingPaused(location)) {
    return imageUrlsCache[image.id]
  }

  if (!imageUrlsCache[image.id]) {
    setImageUrlsCache({
      [image.id]: { thumbUrl: '', imageUrl: '' }
    })
  }

  if (!imageUrlsCache[image.id].thumbUrl && strippedThumb) {
    getUiWorker().then(async uiWorker => {
      const thumbUrl = await uiWorker.getThumbUrlFromBytes(strippedThumb.bytes, { stripped: true })
      setImageUrlsCache(id, 'thumbUrl', thumbUrl)
    })
  }

  loadFile(
    uuid,
    location,
    dc_id
  ).then(async file => {
    if (!file) return

    const uiWorker = await getUiWorker()
    const imageUrl = await uiWorker.getMediaUrlFromFile(file)
    if (!imageUrl) return

    setImageUrlsCache(id, 'imageUrl', imageUrl)
  })

  return imageUrlsCache[image.id]
}

export const pausePostImageLoading = (
  media: MessageMedia
) => {
  const location = getPostImageLocation(media)
  pauseFileLoading(location)
}

const getPostImageLocation = (
  media: MessageMedia
) => {
  const image = getMediaImage(media) || getMediaVideo(media)!

  const { id, access_hash, file_reference } = image
  const type = image._ === 'photo' ? 'inputPhotoFileLocation' : 'inputDocumentFileLocation'
  const size = getMediaImageSize(media) as PhotoSize

  const location: InputFileLocation = {
    _: type,
    id,
    access_hash,
    file_reference,
    thumb_size: size.type
  }

  return location
}
