import { api } from '~/shared/api'

import { handleSignIn } from './handle-sign-in'

export const checkPassword = async (
  password: string
) => {
  const passwordAlgo = await api.req('account.getPassword')
  const passwordHash = await api.exec('getPasswordKdf', {
    passwordAlgo,
    password
  })
  return api.req('auth.checkPassword', {
    password: passwordHash!
  }).then(handleSignIn)
}
