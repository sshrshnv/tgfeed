import type { SetStoreFunction } from 'solid-js/store'
import { createStore } from 'solid-js/store'
import { createStaticStore } from '@solid-primitives/static-store'

import type { StorageKeyValueMap } from '~/shared/storage/local-storage'
import { localStorage } from '~/shared/storage/local-storage'

type Params<T> = {
  defaultState: T
  staticState?: boolean
  storageKey?: keyof StorageKeyValueMap
  nonPersistedKeys?: (keyof T)[]
  onCreate?: (state: T, set: SetStoreFunction<T>) => void
  onChange?: (prevState: T, state: T, set: SetStoreFunction<T>) => void
}

export const createStateStore = <T extends object>({
  defaultState,
  staticState,
  storageKey,
  nonPersistedKeys,
  onCreate,
  onChange
}: Params<T>) => {
  const state: T = storageKey ? {
    ...defaultState,
    ...localStorage.get(storageKey)
  } : defaultState

  // eslint-disable-next-line solid/reactivity
  const store = staticState ? createStaticStore<T>(state) : createStore<T>(state)

  const set = (...args) => {
    const prevState = { ...store[0] }

    if (!args[0]?.ignoreChange) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store[1](...args)
      onChange?.(prevState, store[0], set.bind(null, { ignoreChange: true }))
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store[1](...args.slice(1))
    }

    if (!storageKey) return

    let persisted = true

    const changedState = Object.keys(store[0]).reduce((obj, key) => {
      if (nonPersistedKeys?.includes(key as keyof T)) {
        return obj
      }
      if (prevState[key] !== store[0][key]) {
        persisted = false
      }
      obj[key] = store[0][key]
      return obj
    }, {} as any)

    if (!persisted) {
      localStorage.set(storageKey, changedState)
    }
  }

  onCreate?.(store[0], set.bind(null, { ignoreChange: true }))

  return [
    store[0],
    set
  ] as typeof store
}
