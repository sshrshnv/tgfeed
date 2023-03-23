import type { BeforeInstallPromptEvent } from 'global'

let resolve: (ev: BeforeInstallPromptEvent) => void

export const capturedInstallPromptEvent = new Promise<BeforeInstallPromptEvent>(_resolve =>
  resolve = _resolve
)

export const captureInstallPrompt = () => {
  self.addEventListener('beforeinstallprompt', (ev) => {
    ev.preventDefault()
    resolve(ev)
  })
}
