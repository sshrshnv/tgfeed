import { localStorage } from '~/shared/storage/local-storage'
import { createStateStore } from '~/shared/utils'

import type { AuthState } from './auth.types'

export const AUTH_STATE_STORAGE_KEY = 'authState'

export const DEFAULT_AUTH_STATE: AuthState = {
  step: 'phoneNumber',
  phone_number: '',
  phone_number_formatted: '',
  meta: null
}

export const [authState, setAuthState] = createStateStore({
  defaultState: DEFAULT_AUTH_STATE,
  staticState: true,
  storageKey: AUTH_STATE_STORAGE_KEY
})

export const getPersistedAuthState = () =>
  localStorage.getItem<AuthState>(AUTH_STATE_STORAGE_KEY) || DEFAULT_AUTH_STATE
