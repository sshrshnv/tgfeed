import type { LoadModuleParams } from '~/utils'
import { loadModule } from '~/utils'
import { loadApiWorker } from '~/api'
import { loadDbWorker } from '~/db'
import { loadLangModule } from '~/lang'

export const loadAuthModule = <_, T>(...params: LoadModuleParams<T>) => Promise.all([
  loadModule(...params),
  loadLangModule('auth'),
  loadApiWorker(),
  loadDbWorker()
])
