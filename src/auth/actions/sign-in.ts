import { callApiWorker } from '~/shared/api'

export const signIn = (
  phone_number: string,
  phone_code: string,
  phone_code_hash: string
) => callApiWorker(api => api.req('auth.signIn', {
  phone_number,
  phone_code,
  phone_code_hash
}))
