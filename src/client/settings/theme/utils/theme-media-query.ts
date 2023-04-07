let darkColorScheme: MediaQueryList

export const themeMediaQuery = {
  get dark() {
    if (!darkColorScheme) {
      darkColorScheme = self.matchMedia('(prefers-color-scheme: dark)')
    }
    return darkColorScheme
  }
}
