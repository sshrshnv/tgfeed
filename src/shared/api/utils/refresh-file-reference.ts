import { createPromise } from '~/shared/utils/create-promise'

import type { Chat, Message, InputMessage, MessageMedia, Photo, Document } from '../mtproto'
import { api } from '../api'
import { generateFileUuid } from './generate-file-uuid'

type FileReferenceCache = Record<string, ArrayBuffer>

const fileRefereceCache: FileReferenceCache = {}

const refreshQueue: {
  [channelId: Chat.channel['id']]: {
    waitingIds?: Message.message['id'][]
    waitingPromise?: ReturnType<typeof createPromise>
    sendingIds?: Message.message['id'][]
    sendingPromise?: ReturnType<typeof createPromise>
    timeoutId?: number
  }
} = {}

export const refreshFileReference = async (
  channelId: Chat.channel['id'],
  accessHash: Chat.channel['access_hash'],
  messageId: Message.message['id']
) => {
  if (
    refreshQueue[channelId]?.waitingIds?.includes(messageId) &&
    refreshQueue[channelId].sendingPromise
  ) {
    return refreshQueue[channelId].sendingPromise?.[0]
  }

  if (
    refreshQueue[channelId]?.waitingIds?.includes(messageId) &&
    refreshQueue[channelId].waitingPromise
  ) {
    return refreshQueue[channelId].waitingPromise?.[0]
  }

  if (refreshQueue[channelId]?.timeoutId) {
    self.clearTimeout(refreshQueue[channelId].timeoutId)
    refreshQueue[channelId].timeoutId = 0
  }

  const send = async () => {
    refreshQueue[channelId] = {
      sendingIds: refreshQueue[channelId].waitingIds,
      sendingPromise: refreshQueue[channelId].waitingPromise
    }

    await refetchMessages(
      channelId,
      accessHash,
      refreshQueue[channelId].sendingIds || []
    )

    refreshQueue[channelId].sendingPromise![1]()

    refreshQueue[channelId] = {
      waitingIds: refreshQueue[channelId].waitingIds,
      waitingPromise: refreshQueue[channelId].waitingPromise,
      timeoutId: refreshQueue[channelId].timeoutId
    }
  }

  const timeoutId = self.setTimeout(send)

  refreshQueue[channelId] = {
    sendingIds: refreshQueue[channelId]?.sendingIds,
    sendingPromise: refreshQueue[channelId]?.sendingPromise,
    waitingIds: [...(refreshQueue[channelId]?.waitingIds || []), messageId],
    waitingPromise: refreshQueue[channelId]?.waitingPromise || createPromise(),
    timeoutId
  }

  return refreshQueue[channelId].waitingPromise![0]
}

export const getRefreshedFileReference = (fileUuid: string) =>
  fileRefereceCache[fileUuid]

const refetchMessages = async (
  channelId: Chat.channel['id'],
  accessHash: Chat.channel['access_hash'],
  ids: Message.message['id'][]
) => {
  if (!ids.length) return

  const res = await api.req('channels.getMessages', {
    channel: {
      _: 'inputChannel',
      channel_id: channelId,
      access_hash: accessHash!
    },
    id: ids.map(id => ({
      _: 'inputMessageID',
      id
    }) as InputMessage)
  })

  if (res._ !== 'messages.channelMessages') return

  res.messages.forEach(message => {
    if (message._ !== 'message' || !message.media) return
    const { photo } = message.media as MessageMedia.messageMediaPhoto
    const { document } = message.media as MessageMedia.messageMediaDocument

    if (!photo && !document) return
    const { id = '', file_reference } = (photo as Photo.photo || document as Document.document)!

    if (!file_reference) return
    const fileUuid = generateFileUuid({ id })
    fileRefereceCache[fileUuid] = file_reference
  })
}
