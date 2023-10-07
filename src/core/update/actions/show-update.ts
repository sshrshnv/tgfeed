import { setUpdateState } from '../update-state'

export const showUpdate = () => {
  setUpdateState('available', true)
}
