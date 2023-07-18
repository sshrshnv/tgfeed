import { localStorage } from '~/shared/storage/local-storage'
import { dbStorage } from '~/shared/storage/db-storage'
import { createStateStore } from '~/shared/utils'

import type { AccountState } from './account.types'

export const ACCOUNT_STATE_STORAGE_KEY = 'accountState'

export const DEFAULT_ACCOUNT_STATE: AccountState = {
  authorized: false,
  data: null
}

export const [accountState, setAccountState] = createStateStore({
  defaultState: DEFAULT_ACCOUNT_STATE,
  storageKey: ACCOUNT_STATE_STORAGE_KEY,
  nonPersistedKeys: ['data'],
  onCreate: async (_state, setState) => {
    const data = await dbStorage.get('account', 'data')
    setState({
      authorized: !!data,
      data
    })
  }
})

export const getPersistedAccountState = () =>
  localStorage.getItem<AccountState>(ACCOUNT_STATE_STORAGE_KEY) || DEFAULT_ACCOUNT_STATE
