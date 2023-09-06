import type { ParentComponent } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing/actions/pop-route'
import { getTranslateScaleInParams, getTranslateScaleOutParams } from '~/shared/ui/animations'

import { Dialog } from './dialog'

import * as animationsCSS from '../../animations/animations.sss'
import * as transitionDialogCSS from './transition-dialog.sss'

const ANIMATION_PARAMS = {
  slideInRightAnimation: {
    enter: getTranslateScaleInParams({ translate: '-48px 0', x: true }),
    exit: getTranslateScaleOutParams({ translate: '-24px 0' })
  },
  slideInLeftAnimation: {
    enter: getTranslateScaleInParams({ translate: '48px 0', x: true }),
    exit: getTranslateScaleOutParams({ translate: '24px 0' })
  },
  slideInBottomAnimation: {
    enter: getTranslateScaleInParams({ translate: '0 -24px', y: true }),
    exit: getTranslateScaleOutParams({ translate: '0 -12px' })
  }
}

export type TransitionDialogProps = {
  route: Route
  class?: string
  wrapperClass?: string
  open?: boolean
  modal?: boolean
  animation: keyof typeof ANIMATION_PARAMS
  onAfterEnter?: TransitionProps['onAfterEnter']
  onBeforeExit?: TransitionProps['onBeforeExit']
}

export const TransitionDialog: ParentComponent<TransitionDialogProps> = (props) => {
  const [isTransition, setTransition] = createSignal(false)

  const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
    setTransition(true)
    const animationParams = ANIMATION_PARAMS[props.animation].enter
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  const handleExit: TransitionProps['onExit'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS[props.animation].exit
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
    setTransition(false)
  }

  const handleCancel = () => popRoute(props.route)

  return (
    <Dialog
      class={props.wrapperClass}
      open={props.open || isTransition()}
      closing={!props.open && isTransition()}
      modal={props.modal}
      onCancel={handleCancel}
    >
      <Transition
        onEnter={handleEnter}
        onAfterEnter={props.onAfterEnter}
        onBeforeExit={props.onBeforeExit}
        onExit={handleExit}
      >
        <Show when={props.open}>
          <div class={clsx(
            props.class,
            transitionDialogCSS.animated,
            animationsCSS.forcedPerformance
          )}>
            {props.children}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
