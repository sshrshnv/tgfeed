import type { FeedCache } from './feed.types'

export const feedCache: FeedCache = {
  _channels: {},
  _posts: {},

  get channels() {
    return this._channels
  },

  get posts() {
    return this._posts
  }
}

export const setFeedCache = (data: Partial<FeedCache>) => {
  Object.entries(data).forEach(([key, values]) => {
    key = `_${key}`
    feedCache[key] = {
      ...feedCache[key],
      ...values
    }
  })
}

export const getFeedCache = () => feedCache
