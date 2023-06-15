import type { ParentComponent, JSX } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing'
import type { AnimationParams } from '~/shared/ui/animations'

import { Dialog } from './dialog'
import * as transitionDialogCSS from './transition-dialog.sss'

export type TransitionDialogProps = {
  route: Route
  class?: string
  wrapperClass?: string
  open?: boolean
  modal?: boolean
  inAnimation: AnimationParams
  outAnimation?: AnimationParams
  staticChildren?: JSX.Element
}

export const TransitionDialog: ParentComponent<TransitionDialogProps> = (props) => {
  let animation: Animation

  const [isTransition, setTransition] = createSignal(false)

  const handleBeforeEnter = () => {
    setTransition(true)
  }

  const handleEnter = (el: Element, done) => {
    animation = el.animate(props.inAnimation.keyframes, props.inAnimation.options)
    animation.finished.then(done)
  }

  const handleExit = (el, done) => {
    if (props.outAnimation) {
      animation = el.animate(props.outAnimation.keyframes, props.outAnimation.options)
    } else {
      animation.reverse()
    }
    animation.finished.then(done)
  }

  const handleAfterExit = () => {
    setTransition(false)
  }

  const handleCancel = () => {
    popRoute(props.route)
  }

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
        onBeforeEnter={handleBeforeEnter}
        onEnter={handleEnter}
        onExit={handleExit}
        onAfterExit={handleAfterExit}
      >
        <Show when={props.open}>
          <div class={clsx(
            props.class,
            props.inAnimation.class,
            transitionDialogCSS.animatable
          )}>
            {props.children}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
