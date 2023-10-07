import { createStateStore } from '~/shared/utils/create-state-store'

import { DEFAULT_UPDATE_STATE } from './update.const'

export const [updateState, setUpdateState] = createStateStore({
  defaultState: DEFAULT_UPDATE_STATE,
  staticState: true
})
