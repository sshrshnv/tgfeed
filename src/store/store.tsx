import type { FlowComponent } from 'solid-js'
import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import { liteDb } from '~/db'

import type { Auth } from './auth'
import { INITIAL_AUTH } from './auth'
import type { Settings } from './settings'
import { INITIAL_SETTINGS } from './settings'
import type { User } from './user'
import { INITIAL_USER } from './user'

type Store = {
  auth: Auth
  settings: Settings
  user: User
}

const cachedState = liteDb.getAll<Partial<Store>>()

const INITIAL_STATE = {
  auth: {
    ...INITIAL_AUTH,
    ...cachedState?.auth
  },
  settings: {
    ...INITIAL_SETTINGS,
    ...cachedState?.settings
  },
  user: INITIAL_USER
}

const [store, setStore] = createStore(INITIAL_STATE)

const StoreContext = createContext([store, setStore])

export const Store: FlowComponent = (props) => {
  const value = [store, setStore]

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
