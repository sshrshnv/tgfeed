import type { AccountData } from '../account.types'
import { saveAccount } from '../utils'
import { setAccount } from '../account.state'

export const setAccountData = async (data?: AccountData) => {
  setAccount({
    authorized: !!data?.id,
    data
  })
  saveAccount(data)
}
