import type { ParentComponent } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { DialogProps } from '~/shared/ui/elements'
import { Dialog } from '~/shared/ui/elements'
//import { scaleAnimation, translateYAnimation } from '~/shared/ui/animations'

import * as popoverCSS from './popover.sss'

export type PopoverProps = DialogProps & {
  animationVariant?: 'scale' | 'translateY'
}

export const Popover: ParentComponent<PopoverProps> = (props) => {
  let animation: Animation
  // eslint-disable-next-line solid/reactivity
  //const animationVariant = animationVariants[props.animationVariant || 'scale']

  const [isTransition, setTransition] = createSignal(false)
  const handleBeforeEnter = () => setTransition(true)
  const handleAfterExit = () => setTransition(false)

  const handleEnter = (el, done) => {
    //animation = el.animate(animationVariant.keyframes, animationVariant.options)
    animation.finished.then(done)
  }

  const handleExit = (_el, done) => {
    animation.reverse()
    animation.finished.then(done)
  }

  return (
    <Dialog
      class={popoverCSS.container}
      open={props.open || isTransition()}
      closing={!props.open && isTransition()}
      onCancel={props.onCancel}
      modal
    >
      <Transition
        onBeforeEnter={handleBeforeEnter}
        onEnter={handleEnter}
        onExit={handleExit}
        onAfterExit={handleAfterExit}
      >
        <Show when={props.open}>
          <div class={clsx(
            props.class,
            popoverCSS.base,
            //animationVariant.class
          )}>
            {props.children}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
