import { createPromise } from '~/shared/utils/create-promise'
import { localStorage } from '~/shared/utils/local-storage'
import { callDbWorker } from '~/shared/db'

import type { Account, AccountData } from '../account.types'

let restoredAccount: Account
const [accountDataPromise, resolveAccountDataPromise] = createPromise<AccountData | undefined>()

export const restoreAccount = async () => {
  restoredAccount = localStorage.get<Account>('account') || {
    authorized: false
  }
  const accountData = await callDbWorker(db => db.get('account', 'data'))
  resolveAccountDataPromise(accountData)
}

export const getRestoredAccount = (cb?: (accountData: AccountData | undefined) => void) => {
  if (!restoredAccount) restoreAccount()
  accountDataPromise.then(accountData => cb?.(accountData))
  return restoredAccount
}
