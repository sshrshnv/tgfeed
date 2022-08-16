import type { Component, FlowComponent } from 'solid-js'
import { lazy, createSignal, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Suspense, Show } from 'solid-js/web'

import { waitI18n } from '~/i18n'
import { Status } from '~/ui/elements'

type Props = {
  path: string
}

const INITIAL_STATE: {
  [path in string]: boolean
} = {}

const [loadingStore, setLoadingStore] = createStore(INITIAL_STATE)

export const lazyFeature = (
  path: string,
  modulePromise: () => Promise<{ default: Component<any> }>,
  otherPromises: () => Promise<any>[] = () => []
) => {
  setLoadingStore(path, true)

  return lazy(async () => {
    const [module] = await Promise.all([
      modulePromise(),
      waitI18n(),
      ...otherPromises()
    ])

    return module
  })
}

export const SuspenseFeature: FlowComponent<Props> = (props) => {
  /* eslint-disable-next-line solid/reactivity */
  const [isActive, setActive] = createSignal(loadingStore[props.path])

  const handleTransitionEnd = () => {
    setActive(false)
  }

  return (
    <>
      <Suspense fallback={<Loading path={props.path}/>}>
        {props.children}
      </Suspense>

      <Show when={isActive()}>
        <Status
          loading={loadingStore[props.path]}
          onTransitionEnd={handleTransitionEnd}
        />
      </Show>
    </>
  )
}

const Loading: Component<Props> = (props) => {
  onCleanup(() => {
    setLoadingStore(props.path, false)
  })

  return null
}
