import type { FlowComponent } from 'solid-js'
import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { Settings } from './settings'
import { INITIAL_SETTINGS } from './settings'

export type Store = {
  settings: Settings
}

const INITIAL_STATE: Store = {
  settings: INITIAL_SETTINGS
}

const store = createStore(INITIAL_STATE)
const StoreContext = createContext(store)

export const StoreProvider: FlowComponent = (props) => {
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
