import type { ErrorTracker } from '../errors.types'

let errorTracker: ErrorTracker

export const loadErrorTracker = async () => {
  if (errorTracker) {
    return errorTracker
  }

  errorTracker = await import('@sentry/browser' /* webpackChunkName: 'sentry' */)
  errorTracker.init({ dsn: process.env.SENTRY_DSN })

  return errorTracker
}
