import { initApiWorker } from '~/shared/api/utils/init-api-worker'

export const initWorkers = () => {
  const mainApiMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initApiWorker(mainApiMessageChannel)
  //registerSW()
}
