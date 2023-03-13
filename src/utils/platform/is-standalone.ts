let standalone: boolean
export const isStandalone = () =>
  standalone ??= self.navigator.standalone || self.matchMedia('(display-mode: standalone)').matches
