import type { Component, JSX } from 'solid-js'
import { Show, createMemo, createSignal } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { routing, popRoute } from '~/shared/routing'
import { Dialog } from '~/shared/ui/elements'
import { translateXAnimation, scaleInXAnimation, scaleOutXAnimation } from '~/shared/ui/animations'

import * as dialogStackCSS from './dialog-stack.sss'

export type DialogStackProps = {
  dialogs: {
    [key in Route['id']]: (props?: {
      first?: boolean
    }) => JSX.Element
  }
}

export const DialogStack: Component<DialogStackProps> = (props) => {
  let animation: Animation

  const getPrevRoute = createMemo(() => {
    return routing.dialogRoutes[routing.dialogRoutes.length - 2]
  })
  const getCurrentRoute = createMemo(() => {
    return routing.dialogRoutes[routing.dialogRoutes.length - 1]
  })

  const [getTransitionRoute, setTransitionRoute] = createSignal<Route>()
  const handleBeforeEnter = () => setTransitionRoute(getCurrentRoute())
  const handleAfterExit = () => setTransitionRoute()

  const handleEnter = (el, done) => {
    animation = el.animate(scaleInXAnimation.keyframes, scaleInXAnimation.options)
    animation.finished.then(done)
  }

  const handleExit = (el, done) => {
    animation = el.animate(scaleOutXAnimation.keyframes, scaleOutXAnimation.options)
    animation.finished.then(done)
  }

  const handleCancel = () => {
    if (!getCurrentRoute()) return
    popRoute(routing.dialogRoutes[0])
  }

  return (
    <Dialog
      class={dialogStackCSS.container}
      open={!!getCurrentRoute() || !!getTransitionRoute()}
      closing={!getCurrentRoute() && !!getTransitionRoute()}
      onCancel={handleCancel}
    >
      <Show when={!!getPrevRoute()}>
        <div class={dialogStackCSS.item}>
          {props.dialogs[getPrevRoute()?.id]?.({
            first: true
          })}
        </div>
      </Show>

      <Transition
        onBeforeEnter={handleBeforeEnter}
        onEnter={handleEnter}
        onExit={handleExit}
        onAfterExit={handleAfterExit}
      >
        <Show when={!!getCurrentRoute()}>
          <div class={clsx(
            dialogStackCSS.item,
            scaleInXAnimation.class
          )}>
            {props.dialogs[(getCurrentRoute() || getTransitionRoute())?.id]?.({
              first: !getPrevRoute()
            })}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
