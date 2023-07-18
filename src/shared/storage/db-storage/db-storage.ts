import { getDbStorageWorker } from './utils/init-db-storage-worker'
import { initDbStorage } from './utils/init-db-storage'

export const dbStorage = initDbStorage(getDbStorageWorker)
