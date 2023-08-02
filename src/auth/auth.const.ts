import type { AuthState, AuthStorage } from './auth.types'

export const AUTH_STATE_STORAGE_KEY: keyof AuthStorage['state'] = 'authState'

export const DEFAULT_AUTH_STATE: AuthState = {
  step: 'phoneNumber',
  phone_number: '',
  phone_number_formatted: '',
  meta: null
}
