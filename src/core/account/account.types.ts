import type { User } from '~/shared/api/mtproto'

export type AccountData = User.user

export type AccountDBSchema = {
  account: {
    key: 'data'
    value: AccountData
  }
}

export type Account = {
  authorized: boolean
  data?: AccountData
}
