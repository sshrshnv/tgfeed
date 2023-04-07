import { themeColors } from '~/app.config'

import type { Theme } from '../theme.types'
import { themeMediaQuery } from './theme-media-query'

const themeEl = document.documentElement
const themeColorEl = document.querySelector('meta[name="theme-color"]') as Element

export const setThemeColorAttribute = (theme?: Theme) => {
  const themeColor = themeColors[theme || (themeMediaQuery.dark.matches ? 'dark' : 'light')]
  if (themeColor !== themeColorEl.getAttribute('content')) {
    themeColorEl.setAttribute('content', themeColor)
  }
}

export const setThemeAttributes = (theme?: Theme) => {
  if (typeof theme !== 'undefined' && theme !== themeEl.dataset.theme) {
    themeEl.setAttribute('data-theme', theme)
  }
  setThemeColorAttribute(theme)
}
