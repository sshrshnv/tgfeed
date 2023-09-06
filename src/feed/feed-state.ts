import { createStateStore } from '~/shared/utils/create-state-store'

import { DEFAULT_FEED_STATE, FEED_STATE_STORAGE_KEY } from './feed.const'

export const [feedState, setFeedState] = createStateStore({
  defaultState: DEFAULT_FEED_STATE,
  persistedKeys: ['currentFolderId', 'fontSize'],
  storageKey: FEED_STATE_STORAGE_KEY
})
