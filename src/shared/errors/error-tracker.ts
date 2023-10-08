import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.SENTRY_DSN
})

export const errorTracker = Sentry
