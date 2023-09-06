import { localStorage } from '~/shared/storage/local-storage'
import { dbStorage } from '~/shared/storage/db-storage'
import { createStateStore } from '~/shared/utils/create-state-store'

import {
  DEFAULT_ACCOUNT_STATE,
  ACCOUNT_STATE_STORAGE_KEY,
  ACCOUNT_DATA_STORAGE_KEY
} from './account.const'

export const [accountState, setAccountState] = createStateStore({
  defaultState: DEFAULT_ACCOUNT_STATE,
  storageKey: ACCOUNT_STATE_STORAGE_KEY,
  nonPersistedKeys: ['data'],
  onCreate: async (_state, setState) => {
    const data = await dbStorage.get(ACCOUNT_DATA_STORAGE_KEY)
    setState({
      authorized: !!data,
      data
    })
  }
})

export const getPersistedAccountState = () =>
  localStorage.get(ACCOUNT_STATE_STORAGE_KEY) || DEFAULT_ACCOUNT_STATE
