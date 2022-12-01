import { createStore, unwrap } from 'solid-js/store'

import { liteDb } from '~/db'

export type AuthState = {
  step: 'phone' | 'code' | 'password'
  phone: string
  country: string
}

const AUTH_LITE_DB_KEY = 'auth'

const AUTH_INITIAL_STATE: AuthState = {
  step: 'phone',
  phone: '',
  country: '',
}

export const [authState, setAuthState] = createStore<AuthState>({
  ...AUTH_INITIAL_STATE,
  ...liteDb.getRestored<AuthState>()?.[AUTH_LITE_DB_KEY]
})

export const storeAuthState = (partialState: Partial<AuthState>) => {
  setAuthState(partialState)
  liteDb.set(AUTH_LITE_DB_KEY, {
    ...unwrap(authState),
    ...partialState
  })
}
