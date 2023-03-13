export const maxTouchPoints = self.navigator.maxTouchPoints || 1
export const platform = self.navigator.platform?.toLocaleLowerCase() || ''
export const userAgent = self.navigator.userAgent.toLocaleLowerCase()
export const userAgentData = self.navigator.userAgentData || {}
