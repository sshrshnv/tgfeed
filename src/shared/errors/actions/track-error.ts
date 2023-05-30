import type { APIError } from '~/shared/api'

import { loadErrorTracker } from './load-error-tracker'

export const trackError = async (
  error: APIError | Error
) => {
  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN
  ) return
}
