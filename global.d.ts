export type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type UserAgentData = {
  brands?: { brand: string, version: string }[]
  platform?: string
  mobile?: boolean
}

export type WorkerInitialEvent = {
  data: {
    initial: true
    port: MessagePort
  }
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }

  interface Navigator {
    standalone?: boolean
    userAgentData?: UserAgentData
  }
}
