import type { LoadModuleParams } from '~/utils'
import { loadModule } from '~/utils'
import { loadLangModule } from '~/lang'
import { loadApiWorker } from '~/api'
import { loadDbWorker } from '~/db'

export const loadFeedModule = <_, T>(...params: LoadModuleParams<T>) => Promise.all([
  loadModule(...params),
  loadLangModule('feed'),
  loadApiWorker(),
  loadDbWorker()
])
