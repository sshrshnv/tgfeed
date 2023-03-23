import type { APIError } from '~/shared/api-worker'

import { loadErrorsTracker } from './load-errors-tracker'

export const trackError = async (
  error: APIError | Error
) => {
  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return

  try {
    const { errorsTracker } = await loadErrorsTracker()

    if ((error as APIError).method && !!errorsTracker.withScope) {
      const apiError = error as APIError

      errorsTracker.withScope(scope => {
        scope.setFingerprint([`${apiError.method}-${apiError.type}-${apiError.code}`])
        errorsTracker.captureException(apiError)
      })
    } else {
      errorsTracker.captureException(error)
    }
  } catch (err) {}
}
