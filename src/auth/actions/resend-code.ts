import { callApiWorker } from '~/shared/api'

export const resendCode = (
  phone_number: string,
  phone_code_hash: string
) => callApiWorker(api => api.req('auth.resendCode', {
  phone_number,
  phone_code_hash
}))
