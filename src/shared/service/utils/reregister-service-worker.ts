import { unregisterServiceWorker } from './unregister-service-worker'

const WAITING_TIMEOUT = 4000

export const reregisterServiceWorker = () => {
  return self.setTimeout(async () => {
    await unregisterServiceWorker()
    self.location.reload()
  }, WAITING_TIMEOUT)
}
