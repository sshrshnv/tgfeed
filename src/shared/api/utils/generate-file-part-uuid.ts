import { API_LOADING_PART_SIZE } from '../api.const'

import type { PartialLocation } from './generate-file-uuid'
import { generateFileUuid } from './generate-file-uuid'

export const generateFilePartUuid = (
  location: PartialLocation,
  offset: string | number = 0
) => {
  const fileUuid = generateFileUuid(location)
  if (typeof offset === undefined) {
    return fileUuid
  } else if (typeof offset === 'string') {
    offset = parseInt(offset, 16)
  }
  const index = offset / API_LOADING_PART_SIZE
  return `${fileUuid}-${index}`
}
