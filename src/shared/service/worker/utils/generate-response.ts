import { isSafari } from '~/shared/utils/detect-platform'

export type ResponseParams = {
  size: number
  type: string
  from: number
  to: number
  offset: number
  limit: number
  bytes?: ArrayBuffer
}

export const generateResponse = ({
  size,
  type,
  from,
  to,
  offset,
  limit,
  bytes
}: ResponseParams) => {
  if (from === 0 && to === 1) {
    return new Response(new Uint8Array(2).buffer, {
      status: 206,
      statusText: 'Partial Content',
      headers: [
        ['Content-Range', `bytes 0-1/${size}`],
        ['Accept-Ranges', 'bytes'],
        ['Content-Length', '2'],
        ['Content-Type', type],
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
    bytes = bytes.slice(from - offset, to - offset + 1)
    offset = from
  }

  const length = bytes.byteLength
  from = offset
  to = Math.min(offset + limit, size) - 1

  return new Response(bytes, {
    status: 206,
    statusText: 'Partial Content',
    headers: [
      ['Content-Range', `bytes ${from}-${to}/${size}`],
      ['Accept-Ranges', 'bytes'],
      ['Content-Length', `${length}`],
      ['Content-Type', type],
    ]
  })
}
