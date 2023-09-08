import { generateFilePartUuid } from '~/shared/api/utils/generate-file-part-uuid'
import { dbFileStorage } from '~/shared/storage/db-file-storage'

import type { UI } from '../ui.types'

export const getMediaUrlFromFile: UI['getMediaUrlFromFile'] = async ({
  location,
  type,
  limit,
  partsCount
}) => {
  const keys = [...Array(partsCount).keys()].map(index => {
    const offset = limit * index
    return generateFilePartUuid(location, offset, limit)
  })

  let bytes = await dbFileStorage.getBytes(keys)
  if (!bytes?.length) return

  let file = new Blob(bytes, { type }) as File | undefined
  if (!file) return

  const url = self.URL.createObjectURL(file)

  bytes = undefined
  file = undefined

  return url
}
