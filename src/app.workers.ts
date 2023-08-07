import { initApiWorker } from '~/shared/api/worker'
import { initUiWorker } from '~/shared/ui/worker'

export const initWorkers = () => {
  const mainApiMessageChannel = new MessageChannel()
  const mainUiMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initApiWorker(mainApiMessageChannel)
  initUiWorker(mainUiMessageChannel)
  //registerSW()
}
