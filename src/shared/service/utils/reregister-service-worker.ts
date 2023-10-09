import { unregisterServiceWorker } from './unregister-service-worker'

const WAITING_TIMEOUT = 4000

export const reregisterServiceWorker = (timeout = WAITING_TIMEOUT) => {
  return self.setTimeout(async () => {
    await unregisterServiceWorker()
    self.location.reload()
  }, timeout)
}
