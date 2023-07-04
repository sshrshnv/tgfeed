import { localStorage } from '~/shared/utils'

import type { Account } from '../account.types'

export const getSavedAccount = (): Account => localStorage.get('account') || ({
  authorized: false
})
