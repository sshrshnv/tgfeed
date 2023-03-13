import type { BeforeInstallPromptEvent } from 'global'

let resolve: (ev: BeforeInstallPromptEvent) => void

export const deferredInstallationEvent = new Promise<BeforeInstallPromptEvent>(_resolve =>
  resolve = _resolve
)

export const deferInstallation = () => {
  self.addEventListener('beforeinstallprompt', (ev) => {
    ev.preventDefault()
    resolve(ev)
  })
}
