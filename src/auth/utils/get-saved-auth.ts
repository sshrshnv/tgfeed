import { localStorage } from '~/shared/utils'

import { Auth } from '../auth.types'

export const getSavedAuth = (): Auth => localStorage.get('auth') || ({
  step: 'phoneNumber',
  data: {
    country: '',
    phoneNumber: '',
    code: ''
  }
})
