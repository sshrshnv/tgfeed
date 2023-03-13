import type { ApiError } from '~/api/worker'

import { loadErrorsTracker } from './load-errors-tracker'

export const sendError = async (
  error: ApiError | Error
) => {
  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return

  try {
    const { errorsTracker } = await loadErrorsTracker()

    if ((error as ApiError).method && !!errorsTracker.withScope) {
      const apiError = error as ApiError

      errorsTracker.withScope(scope => {
        scope.setFingerprint([`${apiError.method}-${apiError.type}-${apiError.code}`])
        errorsTracker.captureException(apiError)
      })
    } else {
      errorsTracker.captureException(error)
    }
  } catch (err) {}
}
