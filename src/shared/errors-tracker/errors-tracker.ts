import * as errorsTracker from '@sentry/browser'

errorsTracker.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.APP_VERSION,
  //tunnel: '/proxy/errors/'
})

export {  errorsTracker }
