import type { User } from '~/shared/api/mtproto'

export type AccountData = User.user

export type AccountState = {
  authorized: boolean
  data: AccountData | null
}

export type AccountStorage = {
  data: { accountData: AccountData }
  state: { accountState: AccountState }
}
