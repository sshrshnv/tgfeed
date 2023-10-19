import type { RouteHandlerCallbackOptions } from 'workbox-core'

import type { Service } from '~/service.types'
import type { ResponseParams } from './generate-response'
import { generateResponse } from './generate-response'
import { parseRequest } from './parse-request'
import { calcLimit, calcOffset } from './calc-sizes'
import { cacheResponsePromise, generateResponsePromiseCacheKey } from './cache-response-promise'

export const handleStreamRoute = (
  params: RouteHandlerCallbackOptions,
  loadStreamFilePart: Parameters<Service['handleStreams']>[0]
) => new Promise<Response>(async resolve => {
  const { request, url } = params
  const uuid = url.searchParams.get('uuid')!
  const size = +url.searchParams.get('s')!
  const type = url.searchParams.get('t')!
  const [from, to] = parseRequest(request)
  const limit = calcLimit(from, to)
  const offset = calcOffset(from, limit)
  const resParams: ResponseParams = {
    size,
    type,
    from,
    to,
    offset,
    limit
  }

  if (from === 0 && to === 1) {
    return resolve(generateResponse(resParams))
  }

  const resPromiseCacheKey = generateResponsePromiseCacheKey(uuid, offset, limit)
  cacheResponsePromise(resPromiseCacheKey, { resParams, resolve })
  loadStreamFilePart(uuid, offset, limit)
})
