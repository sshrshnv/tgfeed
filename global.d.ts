export type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type ExperimentalNavigator = Navigator & {
  userAgentData?: {
    brands?: { brand: string, version: string }[]
    platform?: string
    mobile?: boolean
  }
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }

  interface Navigator {
    standalone?: boolean
    userAgentData?: {
      brands?: { brand: string, version: string }[]
      platform?: string
      mobile?: boolean
    }
  }
}
