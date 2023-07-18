import { initApiWorker } from '~/shared/api/utils/init-api-worker'
import { initDbStorageWorker } from '~/shared/storage/db-storage/utils/init-db-storage-worker'

export const initWorkers = () => {
  const mainDbStorageMessageChannel = new MessageChannel()
  const mainApiMessageChannel = new MessageChannel()
  const apiDbStorageMessageChannel = new MessageChannel()
  //const swApiMessageChannel = new MessageChannel()

  initDbStorageWorker(mainDbStorageMessageChannel, apiDbStorageMessageChannel)
  initApiWorker(mainApiMessageChannel, apiDbStorageMessageChannel)
  //registerSW()
}
