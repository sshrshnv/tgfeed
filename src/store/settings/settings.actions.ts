import { liteDb } from '~/db'

import { useStore } from '../store'
import type { Settings } from './settings.state'

const SETTINGS_DB_KEY = 'settings'

export const setSettings = (settings: Partial<Settings>, { cache = true } = {}) => {
  const [store, setStore] = useStore()

  setStore('settings', settings)

  if (cache) {
    liteDb.set(SETTINGS_DB_KEY, store.settings)
  }
}
