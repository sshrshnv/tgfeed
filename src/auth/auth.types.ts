export type AuthStep = 'phoneNumber' | 'code' | 'password'

export type AuthData = {
  country: string
  phoneNumber: string
  code: string
}

export type Auth = {
  step: AuthStep
  data: AuthData
}
