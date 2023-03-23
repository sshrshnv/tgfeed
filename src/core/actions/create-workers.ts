import { createDbWorker } from '~/shared/db-worker'
import { createApiWorker } from '~/shared/api-worker'

export function createWorkers() {
  const mainDbMessageChannel = new MessageChannel()
  const mainApiMessageChannel = new MessageChannel()
  const apiDbMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  createDbWorker(mainDbMessageChannel, apiDbMessageChannel)
  createApiWorker(mainApiMessageChannel, apiDbMessageChannel)
  //registerSW()
}
