import type { RouteHandlerCallbackOptions } from 'workbox-core/types.js'

import { API_LOADING_PART_SIZE } from '~/shared/api/api.const'
import { dbFileStorage } from '~/shared/storage/db-file-storage'
import { isSafari } from '~/shared/utils/detect-platform'

import { getCachedStreamHandler } from './get-stream-url'

export const handleStream = (
  params: RouteHandlerCallbackOptions
) => new Promise<Response>(resolve => {
  const { request, url } = params
  const fileUuid = url.searchParams.get('fileUuid')!
  const fileSize = +url.searchParams.get('fileSize')!
  const fileType = url.searchParams.get('fileType')!

  const loadStreamFilePart = getCachedStreamHandler(fileUuid)
  const [from, to] = parseRequest(request)
  const partSize = calcPartSize(from, to)
  const offsetSize = calcOffsetSize(from, partSize)

  if (from === 0 && to === 1) {
    return resolve(generateResponse({
      fileSize,
      fileType,
      from,
      to,
      offsetSize,
      partSize
    }))
  }

  loadStreamFilePart(
    offsetSize,
    partSize
  ).then(filePartUuid => {
    dbFileStorage.getBytes([filePartUuid]).then(res => {
      const bytes = res?.[0]
      resolve(generateResponse({
        fileSize,
        fileType,
        from,
        to,
        offsetSize,
        partSize,
        bytes
      }))
    })
  })
})

const parseRequest = (request: Request) => {
  const { headers } = request
  const rangeHeader = headers.get('Range') || ''
  const rangeHeaderValue = rangeHeader.split('=')[1] || ''
  const range = rangeHeaderValue.split(', ')[0]
  return range.split('-').map(value => value ? +value : 0)
}

const generateResponse = ({
  fileSize,
  fileType,
  from,
  to,
  offsetSize,
  partSize,
  bytes
}: {
  fileSize: number
  fileType: string
  from: number
  to: number
  offsetSize: number
  partSize: number
  bytes?: Uint8Array
}) => {
  if (from === 0 && to === 1) {
    return new Response(new Uint8Array(2).buffer, {
      status: 206,
      statusText: 'Partial Content',
      headers: [
        ['Content-Range', `bytes 0-1/${fileSize}`],
        ['Accept-Ranges', 'bytes'],
        ['Content-Length', '2'],
        ['Content-Type', fileType],
      ]
    })
  }

  if (!bytes) {
    return new Response('', {
      status: 500,
      statusText: 'Failed to fetch file'
    })
  }

  if (isSafari()) {
    bytes = bytes.slice(from - offsetSize, to - offsetSize + 1)
    offsetSize = from
  }

  const length = bytes.byteLength
  from = offsetSize
  to = Math.min(offsetSize + partSize, fileSize) - 1

  return new Response(bytes, {
    status: 206,
    statusText: 'Partial Content',
    headers: [
      ['Content-Range', `bytes ${from}-${to}/${fileSize}`],
      ['Accept-Ranges', 'bytes'],
      ['Content-Length', `${length}`],
      ['Content-Type', fileType],
    ]
  })
}

const calcOffsetSize = (from: number, partSize: number) =>
  from - (from % partSize)

const calcPartSize = (from: number, to: number) => (to && to < API_LOADING_PART_SIZE) ?
  Math.min(2 ** Math.ceil(Math.log(to - from + 1) / Math.log(2)), API_LOADING_PART_SIZE) :
  API_LOADING_PART_SIZE
