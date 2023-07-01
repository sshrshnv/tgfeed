import type { Auth } from '../auth.types'

const defaultAuth: Auth = {
  step: 'phoneNumber',
  data: {
    country: '',
    phoneNumber: '',
    code: ''
  }
}

export const restoreAuth = () => {
  //
}
