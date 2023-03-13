import { loadWorker } from '~/tools/utils'

import type { DbWorker } from './db.types'

const createDbWorker = () => new Worker(new URL(
  './db.worker' /* webpackChunkName: 'db.worker' */,
  import.meta.url
))

export const loadDbWorker = () => loadWorker<DbWorker>(
  createDbWorker
)
