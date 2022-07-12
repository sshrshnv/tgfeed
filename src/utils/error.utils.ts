import type { ApiError, ApiErrorHandler } from '~/api'
import { db } from '~/db'
import { cacheModule } from '~/utils'

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

export const handleErrors = () => {
  self.addEventListener('error', ({ error }) => sendError(error))
  self.addEventListener('unhandledrejection', ({ reason }) => sendError(reason))
}

export const handleApiErrors: ApiErrorHandler = async (error: ApiError) => {
  const { code, message = '' } = error

  if (CONNECTION_ERRORS.includes(message)) {
    await Promise.all([
      db.clear(),
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

export const sendError = async (
  error: ApiError | Error
) => {
  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return

  try {
    const Sentry = await loadSentry()
    if ((error as ApiError).method && !!Sentry.withScope) {
      const apiError = error as ApiError
      Sentry.withScope(scope => {
        scope.setFingerprint([`${apiError.method}-${apiError.type}-${apiError.code}`])
        Sentry.captureException(apiError)
      })
    } else {
      Sentry.captureException(error)
    }
  } catch (err) {}
}

let Sentry: typeof import('@sentry/browser')
const loadSentry = async () => {
  if (Sentry) return Sentry

  Sentry = await cacheModule(
    '@sentry/browser',
    () => import(/* webpackChunkName: 'sentry' */ '@sentry/browser')
  )
  Sentry.init({ dsn: process.env.SENTRY_DSN })

  return Sentry
}
