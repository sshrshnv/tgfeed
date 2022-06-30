import { getDefaultLang } from '~/i18n'
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

export const restoreSettings = async () => {
  const cachedSettings = await liteDb.get<Settings>(SETTINGS_DB_KEY)

  setSettings({
    lang: getDefaultLang(),
    ...cachedSettings
  }, {
    cache: false
  })
}
