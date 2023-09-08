import type { FeedCache } from './feed.types'

export const feedCache: FeedCache = {
  channels: {},
  posts: {}
}

export const setFeedCache = (data: Partial<FeedCache>) => {
  Object.entries(data).forEach(([key, values]) => {
    feedCache[key] = {
      ...feedCache[key],
      ...values
    }
  })
}
