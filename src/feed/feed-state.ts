import { createStateStore } from '~/shared/utils'

import { DEFAULT_FEED_STATE, FEED_STATE_STORAGE_KEY } from './feed.const'

export const [feedState, setFeedState] = createStateStore({
  defaultState: DEFAULT_FEED_STATE,
  persistedKeys: ['defaultFolderVisibility'],
  storageKey: FEED_STATE_STORAGE_KEY
})
