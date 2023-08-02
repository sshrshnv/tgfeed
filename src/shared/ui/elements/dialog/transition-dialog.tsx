import type { ParentComponent, JSX } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing'
import { isIOS } from '~/shared/utils'

import { Dialog } from './dialog'
import * as animationsCSS from '../animations.sss'
import * as transitionDialogCSS from './transition-dialog.sss'

export type TransitionDialogProps = {
  route: Route
  class?: string
  wrapperClass?: string
  open?: boolean
  modal?: boolean
  animation: Extract<keyof typeof transitionDialogCSS, `${string}Animation`>
  staticChildren?: JSX.Element
}

export const TransitionDialog: ParentComponent<TransitionDialogProps> = (props) => {
  const [isTransition, setTransition] = createSignal(false)

  const handleBeforeEnter = () => setTransition(true)
  const handleAfterExit = () => setTransition(false)

  const handleCancel = () => popRoute(props.route)

  return (
    <Dialog
      class={props.wrapperClass}
      open={props.open || isTransition()}
      closing={!props.open && isTransition()}
      modal={props.modal}
      onCancel={handleCancel}
    >
      {props.staticChildren}

      <Transition
        enterClass={transitionDialogCSS._enter}
        exitClass={transitionDialogCSS._exit}
        enterActiveClass={transitionDialogCSS._enterActive}
        exitActiveClass={transitionDialogCSS._exitActive}
        onBeforeEnter={handleBeforeEnter}
        onAfterExit={handleAfterExit}
      >
        <Show when={props.open}>
          <div class={clsx(
            props.class,
            transitionDialogCSS.animated,
            transitionDialogCSS[props.animation],
            isIOS() && animationsCSS.forcedPerformance
          )}>
            {props.children}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
