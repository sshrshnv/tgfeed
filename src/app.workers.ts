import { initApiWorker } from '~/shared/api/actions'
import { initDbWorker } from '~/shared/db/actions'

export const initWorkers = () => {
  const mainDbMessageChannel = new MessageChannel()
  const mainApiMessageChannel = new MessageChannel()
  const apiDbMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initDbWorker(mainDbMessageChannel, apiDbMessageChannel)
  initApiWorker(mainApiMessageChannel, apiDbMessageChannel)
  //registerSW()
}
