import type { InputFileLocation } from '~/shared/api/mtproto'

import { API_LOADING_PART_SIZE } from '../api.const'

export const generateFileUuid = (
  location: InputFileLocation
) => {
  switch (location._) {
  case 'inputPeerPhotoFileLocation':
    return location.photo_id
  case 'inputPhotoFileLocation':
  case 'inputDocumentFileLocation':
    return location.id
  default:
    return ''
  }
}

export const generateFilePartUuid = (
  location: InputFileLocation,
  offset = ''
) => {
  const fileUuid = generateFileUuid(location)
  if (typeof offset === undefined) {
    return fileUuid
  }
  const index = +offset / API_LOADING_PART_SIZE
  return `${fileUuid}-${index}`
}
