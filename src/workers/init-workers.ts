import { initApiWorker } from './api/actions'
import { initDbWorker } from './db/actions'

export const initWorkers = () => {
  const mainDbMessageChannel = new MessageChannel()
  const mainApiMessageChannel = new MessageChannel()
  const apiDbMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initDbWorker(mainDbMessageChannel, apiDbMessageChannel)
  initApiWorker(mainApiMessageChannel, apiDbMessageChannel)
  //registerSW()
}
