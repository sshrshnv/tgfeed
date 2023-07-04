import { getSavedTheme, getThemeModeMQ, setThemeAttributes, setThemeColorAttribute } from '../utils'

export const presetTheme = () => {
  const savedTheme = getSavedTheme()
  setThemeAttributes(savedTheme)
  getThemeModeMQ('dark').addEventListener('change', (ev) => {
    if (self.document.documentElement.dataset.themeMode !== 'system') return
    setThemeColorAttribute(ev.matches ? 'dark' : 'light')
  })
}
