import { initApiWorker } from './api'
import { initDbWorker } from './db'

export const initWorkers = () => {
  const mainDbMessageChannel = new MessageChannel()
  const mainApiMessageChannel = new MessageChannel()
  const apiDbMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initDbWorker(mainDbMessageChannel, apiDbMessageChannel)
  initApiWorker(mainApiMessageChannel, apiDbMessageChannel)
  //registerSW()
}
