import type { ResponseParams } from './generate-response'

type ResponsePromise = {
  resParams: ResponseParams
  resolve: (res: Response) => void
}

const responsePromiseCache: Record<string, ResponsePromise> = {}

export const cacheResponsePromise = (
  key: string,
  value: ResponsePromise
) => {
  responsePromiseCache[key] = value
}

export const getCachedResponsePromise = (
  key: string
) => {
  return responsePromiseCache[key]
}

export const generateResponsePromiseCacheKey = (
  uuid: string,
  offset: number | string,
  limit: number | string
) => [uuid, offset, limit].join('-')
