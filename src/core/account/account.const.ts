import type { AccountState, AccountStorage } from './account.types'

export const ACCOUNT_STATE_STORAGE_KEY: keyof AccountStorage['state'] = 'accountState'
export const ACCOUNT_DATA_STORAGE_KEY: keyof AccountStorage['data'] = 'accountData'

export const DEFAULT_ACCOUNT_STATE: AccountState = {
  authorized: false,
  data: null
}
