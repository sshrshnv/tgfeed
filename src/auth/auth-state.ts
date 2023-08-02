import { localStorage } from '~/shared/storage/local-storage'
import { createStateStore } from '~/shared/utils'

import { DEFAULT_AUTH_STATE, AUTH_STATE_STORAGE_KEY } from './auth.const'

export const [authState, setAuthState] = createStateStore({
  defaultState: DEFAULT_AUTH_STATE,
  staticState: true,
  storageKey: AUTH_STATE_STORAGE_KEY
})

export const getPersistedAuthState = () =>
  localStorage.get(AUTH_STATE_STORAGE_KEY) || DEFAULT_AUTH_STATE
