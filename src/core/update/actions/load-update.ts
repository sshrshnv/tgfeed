import { service } from '~/shared/service'

import { setUpdateState } from '../update-state'

export const loadUpdate = () => {
  setUpdateState('loading', true)
  service.handleUpdate?.()
}
