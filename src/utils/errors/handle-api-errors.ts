import type { ApiError, ApiErrorHandler } from '~/api/worker'
//import { clearDb } from '~/utils/db'

import { sendError } from './send-error'

const HANDLED_ERRORS = [
  'PHONE_NUMBER_BANNED',
  'PHONE_NUMBER_INVALID',
  'PHONE_NUMBER_FLOOD',
  'PHONE_CODE_EMPTY',
  'PHONE_CODE_EXPIRED',
  'PHONE_CODE_INVALID',
  'PHONE_NUMBER_UNOCCUPIED',
  'SESSION_PASSWORD_NEEDED',
  'PASSWORD_HASH_INVALID',
  'MESSAGE_NOT_MODIFIED',
  'FILE_REFERENCE_EXPIRED'
]

const CONNECTION_ERRORS = [
  'CONNECTION_NOT_INITED'
]

export const handleApiErrors: ApiErrorHandler = async (error: ApiError) => {
  const { code, message = '' } = error

  if (CONNECTION_ERRORS.includes(message)) {
    await Promise.all([
      //clearDb(),
      //unregisterSW()
    ])
    self.location.reload()
    return
  }

  if (code === 303) return

  if (code === 401) {
    if (HANDLED_ERRORS.includes(message)) return
    //logOut()
  }

  if (code !== 400 || !HANDLED_ERRORS.includes(message)) {
    sendError(error)
  }
}
