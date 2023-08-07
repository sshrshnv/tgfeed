import type { FeedState, FeedStorage } from './feed.types'

export const FEED_CONFIG_MESSAGE_TAG = '#tgfeedconfig'

export const FEED_STATE_STORAGE_KEY: keyof FeedStorage['state'] = 'feedState'

export const DEFAULT_FEED_STATE: FeedState = {
  initialLoading: true,
  defaultFolderVisibility: true,
  postUuids: [],
  folders: [],
  filters: [],
  channels: {},
  posts: {}
}
