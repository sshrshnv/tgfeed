import { localStorage } from '~/shared/utils'

import type { AccountData } from '../account.types'
import { setAccount } from '../account.state'

export const setAccountData = async (data?: AccountData) => {
  setAccount({
    authorized: !!data?.id,
    data
  })
  localStorage.set('account', {
    authorized: !!data?.id
  })
}
