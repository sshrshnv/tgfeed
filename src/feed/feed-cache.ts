import type { FeedCache, Channels, Posts } from './feed.types'

declare const self: Window & typeof globalThis & {
  _cache: {
    _channels: Channels
    _posts: Posts
  }
}

self._cache = {
  _channels: {},
  _posts: {}
}

export const feedCache: FeedCache = {
  get channels() {
    return self._cache._channels
  },

  get posts() {
    return self._cache._posts
  }
}

export const setFeedCache = (data: Partial<FeedCache>) => {
  Object.entries(data).forEach(([key, values]) => {
    key = `_${key}`
    self._cache[key] = {
      ...self._cache[key],
      ...values
    }
  })
}
