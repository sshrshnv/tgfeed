import type { InputFileLocation } from '../mtproto'
import { generateFileUuid } from './generate-file-uuid'

export const generateFilePartUuid = (
  location: InputFileLocation,
  offset: number | string,
  limit: number
) => {
  const fileUuid = generateFileUuid(location)
  if (typeof offset === 'string') {
    offset = parseInt(offset, 16)
  }
  const index = Math.floor(offset / limit)

  return ('thumb_size' in location) ?
    `${fileUuid}-${location.thumb_size}-${index}` :
    `${fileUuid}-${index}`
}
