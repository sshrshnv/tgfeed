import type { LoadModuleParams } from '~/utils'
import { loadModule } from '~/utils'
import { loadLangModule } from '~/lang'

export const loadIntroModule = <_, T>(...params: LoadModuleParams<T>) => Promise.all([
  loadModule(...params),
  loadLangModule('intro')
])
