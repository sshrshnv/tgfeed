import { localStorage } from '~/shared/utils'

import { AccountData } from '../account.types'

export const saveAccount = (data?: AccountData) => localStorage.set('account', {
  authorized: !!data?.id
})
