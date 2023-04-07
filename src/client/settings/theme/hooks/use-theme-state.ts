import { getTheme } from '../theme.state'

export const useThemeState = () => ({
  get value() {
    return getTheme()
  }
})
