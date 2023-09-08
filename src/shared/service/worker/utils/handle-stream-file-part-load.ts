import { dbFileStorage } from '~/shared/storage/db-file-storage'

import { getCachedResponsePromise, generateResponsePromiseCacheKey } from './cache-response-promise'
import { generateResponse } from './generate-response'

export const handleStreamFilePartLoad = async (
  filePartUuid: string,
  uuid: string,
  offset: number | string,
  limit: number | string
) => {
  const resPromiseCacheKey = generateResponsePromiseCacheKey(uuid, offset, limit)
  const { resParams, resolve } = getCachedResponsePromise(resPromiseCacheKey)

  const bytes = (await dbFileStorage.getBytes([filePartUuid]))?.[0]
  resolve(generateResponse({ ...resParams, bytes }))
}
