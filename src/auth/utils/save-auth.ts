import { localStorage } from '~/shared/utils'

import type { Auth } from '../auth.types'

export const saveAuth = (auth: Auth) =>
  localStorage.set('auth', auth)
