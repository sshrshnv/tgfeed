import * as errorTracker from '@sentry/browser'

errorTracker.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.APP_VERSION,
  //tunnel: '/proxy/errors/'
})

export { errorTracker }
