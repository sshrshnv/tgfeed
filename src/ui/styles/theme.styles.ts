import { createEffect } from 'solid-js'

import { useSettings } from '~/store'

if (process.env.NODE_ENV === 'development') {
  require('./global.styles.styl')
}

export const DEFAULT_THEME = 'system'
export const THEMES = [DEFAULT_THEME, 'dark', 'light'] as const
export type Theme = typeof THEMES[number]

export const setThemeAttribute = () => {
  const htmlEl = self.document.documentElement
  const { settings } = useSettings()

  createEffect(() => {
    htmlEl.setAttribute('data-theme', settings.theme)
  })
}
