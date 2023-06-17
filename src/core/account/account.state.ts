import { createStore } from 'solid-js/store'

import type { Account } from './account.types'
import { getRestoredAccount } from './actions'

export const [account, setAccount] = createStore<Account>(
  getRestoredAccount(accountData => setAccount('data', accountData))
)
