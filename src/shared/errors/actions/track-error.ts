import type { APIError } from '~/shared/api-worker'

import { loadErrorTracker } from './load-error-tracker'

export const trackError = async (
  error: APIError | Error
) => {
  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return

  try {
    const { errorTracker } = await loadErrorTracker()

    if ((error as APIError).method && !!errorTracker.withScope) {
      const apiError = error as APIError

      errorTracker.withScope(scope => {
        scope.setFingerprint([`${apiError.method}-${apiError.type}-${apiError.code}`])
        errorTracker.captureException(apiError)
      })
    } else {
      errorTracker.captureException(error)
    }
  } catch (err) {}
}
