import { db } from '~/db'

import { useStore } from '../store'
import type { User } from './user.state'

const USER_DB_KEY = 'user'

export const setUser = (user: Partial<User>, { cache = true } = {}) => {
  const [store, setStore] = useStore()

  setStore('user', user)

  if (cache) {
    db.set(USER_DB_KEY, store.user)
  }
}
