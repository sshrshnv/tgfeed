import { callApiWorker } from '~/shared/api'

export const checkPassword = async (
  password: string
) => {
  const passwordAlgo = await callApiWorker(api => api.req('account.getPassword'))
  const passwordHash = await callApiWorker(api => api.localReq('getPasswordKdf', {
    passwordAlgo,
    password
  }))
  return callApiWorker(api => api.req('auth.checkPassword', {
    password: passwordHash
  }))
}
