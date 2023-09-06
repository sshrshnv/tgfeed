import { initApiWorker } from '~/shared/api/worker/init-api-worker'
import { initUiWorker } from '~/shared/ui/worker/init-ui-worker'
import { registerServiceWorker } from '~/shared/service/worker/register-service-worker'

export const initWorkers = () => {
  const mainApiMessageChannel = new MessageChannel()
  const mainUiMessageChannel = new MessageChannel()
  const mainServiceMessageChannel = new MessageChannel()

  initApiWorker(mainApiMessageChannel)
  initUiWorker(mainUiMessageChannel)
  registerServiceWorker(mainServiceMessageChannel)
}
