import { createPromise } from '~/shared/utils/create-promise'

import type { Chat, Message, InputFileLocation, UploadFile } from '../mtproto'
import type { APIError } from '../api.types'
import { api } from '../api'
import { API_LOADING_PART_SIZE } from '../api.const'
import { generateFileUuid } from './generate-file-uuid'
import { refreshFileReference } from './refresh-file-reference'
import { getRefreshedFileReference } from './refresh-file-reference'

export const loadFilePart = async (
  channelId: Chat.channel['id'],
  accessHash: Chat.channel['access_hash'],
  messageId: Message.message['id'],
  location: InputFileLocation,
  dc: number,
  thread: number,
  offset = 0,
  limit = API_LOADING_PART_SIZE
) => {
  const fileUuid = generateFileUuid(location)
  const refreshedFileReference = getRefreshedFileReference(fileUuid)
  const [promise, resolve, reject] = createPromise<UploadFile | void>()

  if ('file_reference' in location && refreshedFileReference) {
    location.file_reference = refreshedFileReference
  }

  api.req('upload.getFile', {
    location,
    cdn_supported: false,
    offset: offset.toString(16).padStart(16, '0'),
    limit
  }, {
    thread,
    dc
  }).then(res => {
    resolve(res)
  }).catch(async (err: APIError) => {
    if (err.message !== 'FILE_REFERENCE_EXPIRED') {
      return reject(err)
    }

    await refreshFileReference(
      channelId,
      accessHash,
      messageId
    )

    resolve(loadFilePart(
      channelId,
      accessHash,
      messageId,
      location,
      dc,
      thread,
      offset,
      limit
    ))
  })

  return promise
}

export const parseFileType = (res: UploadFile) => {
  return res._.replace('storage.file', '').toLowerCase()
}
