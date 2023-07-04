import { createStore } from 'solid-js/store'

import type { Account, AccountData } from './account.types'
import { getSavedAccount, getSavedAccountData } from './utils'

const getIniaitalState = (cb: (accountData: AccountData | undefined) => void) => {
  const savedAccount = getSavedAccount()
  getSavedAccountData().then(cb)
  return savedAccount
}

export const [account, setAccount] = createStore<Account>(
  getIniaitalState(accountData => setAccount('data', accountData))
)
