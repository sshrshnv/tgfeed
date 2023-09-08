import createSyncTaskQueue from 'sync-task-queue'

import type { InputFileLocation } from '~/shared/api/mtproto'
import {
  API_LOADING_PART_SIZE,
  API_LOADING_TIMEOUT,
  API_MAX_LOADING_COUNT,
  API_MAX_LOADING_THREAD_COUNT,
} from '~/shared/api/api.const'
import { generateFileUuid } from '~/shared/api/utils/generate-file-uuid'
import { loadFilePart, parseFileType } from '~/shared/api/utils/load-file-part'
import { setDelay } from '~/shared/utils/set-delay'
import { createPromise } from '~/shared/utils/create-promise'

import type { ChannelId } from '../feed.types'

type FileResponse = {
  location: InputFileLocation
  type: string
  limit: number
  partsCount: number
}

const loadingPartsCountCache: Record<string, number> = {}
const loadingPauseCache: Record<string, boolean> = {}
const loadingQueueIndexes = [...Array(API_MAX_LOADING_COUNT * API_MAX_LOADING_THREAD_COUNT).keys()]

const loadingQueue = {
  nextIndex: 0,

  queues: loadingQueueIndexes.reduce((queue, index) => {
    queue[index] = createSyncTaskQueue()
    return queue
  }, {}),

  add: (fn: (queueIndex: number) => void) => {
    const currentIndex = loadingQueue.nextIndex

    loadingQueue.queues[currentIndex].enqueue(async () => {
      await fn(currentIndex)
      return setDelay(API_LOADING_TIMEOUT)
    })

    loadingQueue.nextIndex =
      currentIndex === API_MAX_LOADING_COUNT - 1 ? 0 :
      currentIndex + 1
  }
}

export const loadFile = async (
  channelId: ChannelId,
  accessHash: string,
  messageId: number,
  location: InputFileLocation,
  dc: number,
  size?: number
): Promise<FileResponse | undefined> => {
  const [promise, resolve] = createPromise<FileResponse | undefined>()
  const fileUuid = generateFileUuid(location)

  if (loadingPauseCache[fileUuid]) {
    loadingPauseCache[fileUuid] = false
  }

  if (!size || size <= API_LOADING_PART_SIZE) {
    loadingQueue.add(async () => {
      const res = await loadFilePart(
        channelId,
        accessHash,
        messageId,
        location,
        dc,
        2
      )

      if (!res) {
        return resolve()
      }

      return resolve({
        location,
        type: parseFileType(res),
        limit: API_LOADING_PART_SIZE,
        partsCount: 1
      })
    })

    return promise
  }

  const partsCount = Math.ceil(size / API_LOADING_PART_SIZE)
  const startIndex = loadingPartsCountCache[fileUuid] || 0
  const threadsCount = Math.max(Math.min(API_MAX_LOADING_THREAD_COUNT, partsCount - startIndex), 0)
  const threadIndexes = [...Array(threadsCount).keys()]

  threadIndexes.map(async threadIndex => {
    for (let i = 0; i <= Math.ceil(partsCount / threadsCount); i++) {
      if (loadingPauseCache[fileUuid]) {
        return resolve()
      }

      if ((loadingPartsCountCache[fileUuid] || 0) === partsCount) break

      const loadingIndex = startIndex + threadIndex + i
      const offset = loadingIndex * API_LOADING_PART_SIZE

      loadingQueue.add(async (queueIndex) => {
        const res = await loadFilePart(
          channelId,
          accessHash,
          messageId,
          location,
          dc,
          queueIndex + 3,
          offset
        )

        loadingPartsCountCache[fileUuid] = (loadingPartsCountCache[fileUuid] || 0) + 1

        if (loadingPartsCountCache[fileUuid] === partsCount) {
          if (!res) {
            return resolve()
          }

          return resolve({
            location,
            type: parseFileType(res),
            limit: API_LOADING_PART_SIZE,
            partsCount
          })
        }
      })
    }
  })

  return promise
}

export const pauseFileLoading = (
  location: InputFileLocation,
) => {
  const fileUuid = generateFileUuid(location)
  loadingPauseCache[fileUuid] = true
}

export const isFileLoadingPaused = (
  location?: InputFileLocation,
) => {
  if (!location) return
  const fileUuid = generateFileUuid(location)
  return loadingPauseCache[fileUuid]
}
