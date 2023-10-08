import type { APIError } from '~/shared/api'

import { loadErrorTracker } from './load-error-tracker'

export const trackError = async (
  error: APIError | Error
) => {
  if (
    process.env.DEPLOY_ENV !== 'production' ||
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return

  const { errorTracker } = await loadErrorTracker()
  errorTracker.captureException(error)
}
