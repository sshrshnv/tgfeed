import type { Service } from '../../service.types'
import { SERVICE_STREAM_URL } from '../../service.const'

type StreamHandlersCache = Record<string, Parameters<Service['getStreamUrl']>[1]>

const streamParamsCache: StreamHandlersCache = {}

export const getStreamUrl: Service['getStreamUrl'] = async (
  params,
  loadStreamFilePart
) => {
  const { fileUuid } = params

  if (!streamParamsCache[fileUuid]) {
    streamParamsCache[fileUuid] = loadStreamFilePart
  }

  return `${SERVICE_STREAM_URL}?${new URLSearchParams(params as unknown as Record<string, string>).toString()}`
}

export const getCachedStreamHandler = (uuid: string) =>
  streamParamsCache[uuid]
