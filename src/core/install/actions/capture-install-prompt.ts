import type { BeforeInstallPromptEvent } from 'global'

import { createPromise } from '~/shared/utils/create-promise'

const [
  capturedInstallPromptPromise,
  resolveCapturedInstallPromptPromise
] = createPromise<BeforeInstallPromptEvent>()

export const captureInstallPrompt = () => {
  self.addEventListener('beforeinstallprompt', (ev) => {
    ev.preventDefault()
    resolveCapturedInstallPromptPromise(ev)
  })
}

export const getCapturedInstallPrompt = () => capturedInstallPromptPromise
