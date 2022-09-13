import type { ParentComponent } from 'solid-js'
import { Show } from 'solid-js/web'

import { RouteButton, RouteOverlay, useRoute } from '~/router'
import { Pane, PaneHeader } from '~/ui/layout'

import { SuspenseFeature } from './feature'

type Props = {
  path: string
  title: string
}

export const PaneFeature: ParentComponent<Props> = (props) => {
  const { route, isMatch, hasOverlay, setTransition } = useRoute()
  const overlay = hasOverlay()

  const handleMount = () => {
    setTransition(true)
  }

  const handleCleanup = () => {
    setTransition(false)
  }

  return (
    <>
      <Pane
        active={isMatch()}
        onMount={handleMount}
        onCleanup={handleCleanup}
      >
        <PaneHeader title={props.title}>
          <RouteButton
            back
            route={route}
            icon="cross"
          />
        </PaneHeader>

        <SuspenseFeature path={props.path}>
          {props.children}
        </SuspenseFeature>
      </Pane>

      <Show when={overlay}>
        <RouteOverlay
          route={route}
          active={isMatch()}
          platform="desktop"
        />
      </Show>
    </>
  )
}
