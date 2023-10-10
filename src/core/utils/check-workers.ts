import { service } from '~/shared/service'
import { registerServiceWorker } from '~/shared/service/worker/register-service-worker'
import { api } from '~/shared/api'
import { initApiWorker } from '~/shared/api/worker/init-api-worker'
import { ui } from '~/shared/ui'
import { initUiWorker } from '~/shared/ui/worker/init-ui-worker'

type Key = 'service' | 'api' | 'ui'

const CHECK_TIMEOUT = 2000
const CHECK_INTERVAL = 4000
const MAX_ATTEMPTS_COUNT = 2

const attempts: Record<Key, number> = {
  service: 0,
  api: 0,
  ui: 0
}

const checkTimeoutIds: Record<Key, number> = {
  service: 0,
  api: 0,
  ui: 0
}

export const checkWorkers = () => {
  checkWorker('service', service, registerServiceWorker)
  checkWorker('api', api, initApiWorker)
  checkWorker('ui', ui, initUiWorker)
}

export const recheckWorkers = () => {
  Object.values(checkTimeoutIds).forEach(timeoutId => self.clearTimeout(timeoutId))
  checkWorkers()
}

const checkWorker = (
  key: Key,
  worker,
  run
) => {
  let rerunTimeoutId = 0

  console.warn(`CHECK ${key}: ${attempts[key]}`)

  worker.check().then(() => {
    console.warn(`CHECK ${key}: ${attempts[key]} SUCCESS`)

    self.clearTimeout(rerunTimeoutId)
    checkTimeoutIds[key] = self.setTimeout(() => {
      checkWorker(key, worker, run)
    }, CHECK_INTERVAL)
  })

  rerunTimeoutId = self.setTimeout(() => {
    console.error(`FREEZE ${key}: ${attempts[key]}`)

    if (attempts[key] === MAX_ATTEMPTS_COUNT) {
      // self.location.reload()
      // return
    }

    attempts[key] += 1
    run()
  }, CHECK_TIMEOUT)
}
