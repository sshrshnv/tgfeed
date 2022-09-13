import type { Component, FlowComponent } from 'solid-js'
import { lazy, createSignal, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Suspense, Show } from 'solid-js/web'

import { waitI18n } from '~/i18n'
import { Progress } from '~/ui/elements'

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

type SuspenseProps = {
  path: string
}

export const SuspenseFeature: FlowComponent<SuspenseProps> = (props) => {
  /* eslint-disable-next-line solid/reactivity */
  const [isVisible, setVisible] = createSignal(loadingStore[props.path])

  const handleTransitionEnd = () => {
    setVisible(false)
  }

  return (
    <>
      <Suspense fallback={<SuspenseFallback path={props.path}/>}>
        {props.children}
      </Suspense>

      <Show when={isVisible()}>
        <Progress
          active={loadingStore[props.path]}
          onTransitionEnd={handleTransitionEnd}
          linear
        />
      </Show>
    </>
  )
}

const SuspenseFallback: Component<SuspenseProps> = (props) => {
  onCleanup(() => {
    setLoadingStore(props.path, false)
  })

  return null
}
