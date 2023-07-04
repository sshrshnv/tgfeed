import { createStore } from 'solid-js/store'

import type { Auth } from './auth.types'
import { getSavedAuth } from './utils'

const getInitialState = () => {
  return getSavedAuth()
}

export const [auth, setAuth] = createStore<Auth>(
  getInitialState()
)
