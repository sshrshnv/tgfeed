import { recheckWorkers } from './check-workers'

type State = 'focused' | 'notfocused' | 'hidden' | 'frozen' | 'terminated'

const detectState = (): State =>
  self.document.visibilityState === 'hidden' ? 'hidden' :
  self.document.hasFocus() ? 'focused' :
  'notfocused'

const onFocus = () =>
  handleStateChange(detectState())

const onFreeze = () =>
  handleStateChange('frozen')

const onHide = (ev) =>
  handleStateChange(ev.persisted ? 'frozen' : 'terminated')

export const handleLifecycle = () => {
  ['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach(type => {
    self.addEventListener(type, onFocus, { capture: true })
  })
  self.addEventListener('freeze', onFreeze, {capture: true})
  self.addEventListener('pagehide', onHide, { capture: true })
}

let state: State = detectState()

const handleStateChange = (newState: State) => {
  if (newState === state) return
  state = newState

  if (newState === 'focused') {
    recheckWorkers()
  }
}
