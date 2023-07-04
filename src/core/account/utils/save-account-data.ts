import { callDbWorker } from '~/shared/db'

import type { AccountData } from '../account.types'

export const saveAccountData = (data: AccountData) =>
  callDbWorker(db => db.put('account', data))
