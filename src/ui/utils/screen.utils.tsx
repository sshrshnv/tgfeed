import type { FlowComponent } from 'solid-js'
import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import { styleVars } from '~/ui/styles'

const { screenMQ } = styleVars

type ScreenMQKey = keyof typeof screenMQ

type ScreenMQ = {
  [K in ScreenMQKey]: boolean
}

const INITIAL_STATE: ScreenMQ = Object.entries(screenMQ).reduce((obj, [key, query]) => {
  const mqList = self.matchMedia(query)
  mqList.addEventListener('change', (ev) => mqChangeHandler(key as ScreenMQKey, ev))

  return ({
    ...obj,
    [key]: mqList.matches
  })
}, {} as ScreenMQ)

const [store, setStore] = createStore(INITIAL_STATE)
const ScreenMQContext = createContext<ScreenMQ>(store)

const mqChangeHandler = (key: ScreenMQKey, ev: MediaQueryListEvent) => {
  setStore(key as ScreenMQKey, ev.matches)
}

export const ScreenMQProvider: FlowComponent = (props) => {
  return (
    <ScreenMQContext.Provider value={store}>
      {props.children}
    </ScreenMQContext.Provider>
  )
}

export const useScreenMQ = () => useContext(ScreenMQContext)
