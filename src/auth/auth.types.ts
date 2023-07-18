import type { AuthSentCode } from '~/shared/api/mtproto'

export type AuthStep = 'phoneNumber' | 'code' | 'password'

export type AuthState = {
  step: AuthStep
  phone_number?: string
  phone_number_formatted?: string
  meta: AuthSentCode.authSentCode | null
}
