import { unwrap } from 'solid-js/store'
import createSyncTaskQueue from 'sync-task-queue'

import type { UploadFile, InputFileLocation } from '~/shared/api/mtproto'
import type { APIError } from '~/shared/api'
import {
  API_LOADING_PART_SIZE,
  API_LOADING_TIMEOUT,
  API_MAX_LOADING_COUNT,
  API_MAX_LOADING_THREAD_COUNT,
  api
} from '~/shared/api'
import { generateFileUuid } from '~/shared/api/utils'
import { setDelay, createPromise } from '~/shared/utils'

import type { ChannelId, PostUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { refreshFileReference } from './refresh-file-reference'

type FileResponse = {
  fileUuid: string
  type: string
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
  uuid: ChannelId | PostUuid,
  location: InputFileLocation,
  dc: number,
  size?: number
): Promise<FileResponse | undefined> => {
  const fileUuid = generateFileUuid(location)

  if (loadingPauseCache[fileUuid]) {
    loadingPauseCache[fileUuid] = false
  }

  if (!size || size <= API_LOADING_PART_SIZE) {
    const res = await loadFilePart(uuid, location, dc)
    if (!res) return

    return {
      fileUuid,
      type: parseFileType(res),
      partsCount: 1
    }
  }

  const [promise, resolve] = createPromise<FileResponse | undefined>()
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
      const offset = `${loadingIndex * API_LOADING_PART_SIZE || ''}`

      const res = await loadFilePart(
        uuid,
        location,
        dc,
        offset
      )

      loadingPartsCountCache[fileUuid] = (loadingPartsCountCache[fileUuid] || 0) + 1

      if (loadingPartsCountCache[fileUuid] === partsCount) {
        if (!res) {
          return resolve()
        }

        return resolve({
          fileUuid,
          type: parseFileType(res),
          partsCount
        })
      }
    }
  })

  return promise
}

const loadFilePart = (
  uuid: ChannelId | PostUuid,
  location: InputFileLocation,
  dc: number,
  offset = '',
  limit = API_LOADING_PART_SIZE,
  updateLocation = false
) => {
  const fileUuid = generateFileUuid(location)
  const [promise, resolve, reject] = createPromise<UploadFile | void>()

  loadingQueue.add(async (queueIndex) => {
    if (loadingPauseCache[fileUuid]) {
      return resolve()
    }

    if (updateLocation) {
      const { photo, document } = unwrap(feedState).posts[fileUuid].media
      location = (photo || document).file_reference
    }

    const res = await api.req('upload.getFile', {
      location,
      cdn_supported: false,
      offset,
      limit
    }, {
      thread: queueIndex + 2,
      dc
    }).catch(async (err: APIError) => {
      if (err.message !== 'FILE_REFERENCE_EXPIRED') {
        return reject(err)
      }

      await refreshFileReference(
        uuid as PostUuid
      )

      return loadFilePart(
        uuid,
        location,
        dc,
        offset,
        limit,
        true
      )
    })

    resolve(res)
  })

  return promise
}

const parseFileType = (res: UploadFile) => {
  return res._.replace('storage.file', '').toLowerCase()
}

export const pauseFileLoading = (
  location: InputFileLocation,
) => {
  const fileUuid = generateFileUuid(location)
  loadingPauseCache[fileUuid] = true
}

export const isFileLoadingPaused = (
  location: InputFileLocation,
) => {
  const fileUuid = generateFileUuid(location)
  return loadingPauseCache[fileUuid]
}
