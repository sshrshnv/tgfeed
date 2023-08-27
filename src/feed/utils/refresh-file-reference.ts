import { createPromise } from '~/shared/utils'

import type { ChannelId, PostId, PostUuid } from '../feed.types'
import { refetchPosts } from '../actions'

const refreshQueue: {
  [channelId: ChannelId]: {
    waitingIds?: PostId[]
    waitingPromise?: ReturnType<typeof createPromise>
    sendingIds?: PostId[]
    sendingPromise?: ReturnType<typeof createPromise>
    timeoutId?: number
  }
} = {}

export const refreshFileReference = async (
  uuid: PostUuid
) => {
  const [channelId, postId] = uuid.split('-').map((value, index) =>
    index ? +value : value
  ) as [ChannelId, PostId]

  if (
    refreshQueue[channelId]?.waitingIds?.includes(postId) &&
    refreshQueue[channelId].sendingPromise
  ) {
    return refreshQueue[channelId].sendingPromise?.[0]
  }

  if (
    refreshQueue[channelId]?.waitingIds?.includes(postId) &&
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

    await refetchPosts(
      channelId,
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
    waitingIds: [...(refreshQueue[channelId]?.waitingIds || []), postId],
    waitingPromise: refreshQueue[channelId]?.waitingPromise || createPromise(),
    timeoutId
  }

  return refreshQueue[channelId].waitingPromise![0]
}
