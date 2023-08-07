import createSyncTaskQueue from 'sync-task-queue'

import type { InputFileLocation } from '~/shared/api/mtproto'
import { api } from '~/shared/api'
import { setDelay } from '~/shared/utils'

const LOADING_PART_SIZE = 1024 * 1024
const LOADING_TIMEOUT = 400
const LOADING_THREAD_COUNT = 2
const MAX_LOADING_COUNT = 8

const loadingQueue = {
  nextIndex: 0,

  queues: [...Array(MAX_LOADING_COUNT).keys()].reduce((queue, index) => {
    queue[index] = createSyncTaskQueue()
    return queue
  }, {}),

  add: fn => {
    const currentIndex = loadingQueue.nextIndex
    loadingQueue.queues[currentIndex].enqueue(async () => {
      await fn()
      return setDelay(LOADING_TIMEOUT)
    })
    loadingQueue.nextIndex = currentIndex === MAX_LOADING_COUNT - 1 ? 0 : currentIndex + 1
  }
}

export const loadFile = async (
  messageId: number,
  file: LoadingFile
) => {
  const channel = getActiveChannel() as Channel
  let loadingFile: LoadingFile | undefined = getLoadingFile(file) || file

  if (
    loadingFile.fileKey ||
    loadingFile.loading
  ) return

  loadingFile = {
    ...loadingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    sizeType: file.sizeType,
    loading: true,
    ...(!loadingFile.partsCount ? {
      partSize: LOADING_PART_SIZE,
      partsCount: Math.ceil(file.size / LOADING_PART_SIZE)
    } : {})
  }

  setLoadingFile(loadingFile)

  loadingQueue.add(async () => {
    const loadingFile = getLoadingFile(file)
    if (!loadingFile?.loading) return

    const { partsCount = 0 } = loadingFile
    const threadCount = Math.min(LOADING_THREAD_COUNT, partsCount)

    const loadPart = async (part: number, thread: number) => {
      const loadingFile = getLoadingFile(file)
      if (!loadingFile?.loading || part > partsCount - 1) return

      await loadFilePart(messageId, channel, file, part, thread)
      return loadPart(part + threadCount, thread)
    }

    await Promise.all([...Array(threadCount).keys()].map(index =>
      loadPart((loadingFile[`lastLoadedPart${index}`] || (index - 1)) + 1, index)
    ))
  })
}

const DONWLOADED_PARTS_COUNT: {
  [fileKey: string]: number
} = {}

export const loadFilePart = async (
  messageId: number,
  channel: Channel,
  file: LoadingFile,
  part: number,
  thread: number
) => {
  let loadingFile = getLoadingFile(file)
  if (!loadingFile?.loading) return

  const {
    id,
    partSize = 0,
    dc_id,
    access_hash,
    file_reference,
    sizeType,
    originalSizeType
  } = loadingFile

  const offsetSize = part * partSize

  let bytes = await api.loadFilePart({
    id,
    partSize,
    offsetSize,
    dc_id,
    access_hash,
    file_reference,
    sizeType,
    originalSizeType,
    thread
  }).catch(({ message }) => {
    if (loadingFile && message === 'FILE_REFERENCE_EXPIRED') {
      pauseLoadingFile(loadingFile)
      refreshMessage(channel, messageId)
    }
  })

  if (!bytes) return

  loadingFile = getLoadingFile(file)
  if (!loadingFile) return

  let fileKey: string|undefined = generateFileKey(loadingFile)

  DONWLOADED_PARTS_COUNT[fileKey] = (DONWLOADED_PARTS_COUNT[fileKey] || 0) + 1
  const loadedPartsCount = DONWLOADED_PARTS_COUNT[fileKey]

  const { type, partsCount = 0 } = loadingFile
  const isLastPart = loadedPartsCount === partsCount

  await setBytes(fileKey, part, bytes)
  bytes = undefined

  fileKey = isLastPart ?
    await createFile(fileKey, partsCount, sizeType ? 'image/jpeg' : type === 'v' ? 'video/mp4' : type) :
    undefined

  if (isLastPart && type === 'v') {
    const videoParams = await parseVideoFile(fileKey)
    fileKey = videoParams?.thumbFileKey
  }

  loadingFile = getLoadingFile(file)
  if (!loadingFile) return

  setLoadingFile({
    ...loadingFile,
    ...(fileKey ? {
      fileKey,
      loading: false
    } : {}),
    loadedPartsCount,
    [`lastLoadedPart${thread}`]: part,
    progress: Math.round(loadedPartsCount / partsCount * 100)
  })
}

export const getStreamingFile = (
  fileKey: string
) => {
  return store.getState().streamingFiles.get(fileKey)
}

export const setStreamingFile = (
  file: StreamingFile
) => {
  const streamingFiles = new Map(store.getState().streamingFiles)
  const fileKey = generateFileKey(file)
  streamingFiles.set(fileKey, file)
  store.setState({
    streamingFiles
  })
}

export const streamFile = (
  messageId: number,
  file: LoadingFile,
  save?: boolean
) => {
  const channel = getActiveChannel() as Channel
  const fileKey = generateFileKey(file)
  let streamingFile: StreamingFile | undefined =
    getStreamingFile(fileKey) ||
    { ...file, channel, messageId }

  streamingFile = {
    ...streamingFile,
    file_reference: file.file_reference,
    dc_id: file.dc_id,
    access_hash: file.access_hash,
    streaming: true,
    channel,
    messageId
  }
  setStreamingFile(streamingFile)

  return save ?
    generateSaveFileStreamUrl(streamingFile) :
    generateFileStreamUrl(streamingFile)
}

export const loadStreamFilePart = async ({
  fileKey,
  offsetSize,
  partSize,
  file_reference
}: {
  fileKey: string
  offsetSize: number
  partSize: number
  file_reference?: ArrayBuffer
}): Promise<Uint8Array|undefined> => {
  let streamingFile = getStreamingFile(fileKey) as StreamingFile
  if (!streamingFile) return

  if (file_reference) {
    streamingFile = {
      ...streamingFile,
      file_reference
    }
    setStreamingFile(streamingFile)
  }

  const bytes = await api.loadFilePart({
    ...streamingFile,
    offsetSize,
    partSize,
    precise: false
  }).catch(({ message }) => {
    if (message === 'FILE_REFERENCE_EXPIRED') {
      const { channel, messageId } = streamingFile
      if (!channel || !messageId) return

      return refreshMessage(channel, messageId, 0, () => {
        const file_reference = getFileReference(streamingFile)
        return loadStreamFilePart({ fileKey, offsetSize, partSize, file_reference })
      }) as Promise<Uint8Array|undefined>
    }
  })

  return bytes
}

export const getFileReference = ({
  channel,
  messageId,
  id
}: {
  channel: Channel
  messageId: number
  id: string
}) => {
  const state = store.getState()
  const channelMessages = state.channelsMessages.get(channel.id)
  const message = channelMessages?.get(messageId)
  const media = [
    message?.media,
    ...(message?.mediaMessages?.map(({ media }) => media) || [])
  ].find(media => media?.id === id)
  return media?.file_reference
}
