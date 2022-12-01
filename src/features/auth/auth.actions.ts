import { api } from '~/api'
import { liteDb } from '~/db'
/*
import { useStore } from '../store'
import type { AuthState } from './auth.state'

const AUTH_DB_KEY = 'auth'

export const setAuth = (auth: Partial<Auth>, { cache = true } = {}) => {
  const [store, setStore] = useStore()

  setStore('auth', auth)

  if (cache) {
    liteDb.set(AUTH_DB_KEY, store.auth)
  }
}

export const fetchCountry = async () => {
  const dc = await api.call('help.getNearestDc')
  return dc.country || ''
}
*/
