import type { LoadModuleParams } from '~/utils'
import { loadModule } from '~/utils'
import { loadLangModule } from '~/lang'
import { loadApiWorker } from '~/api'
import { loadDbWorker } from '~/db'

export const loadAuthModule = <_, T>(...params: LoadModuleParams<T>) => Promise.all([
  loadModule(...params),
  loadLangModule('auth'),
  loadApiWorker(),
  loadDbWorker()
])
