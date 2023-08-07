import type { ParentComponent } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing'
import { isIOS } from '~/shared/utils'

import { Dialog } from './dialog'

import * as animationsCSS from '../animations.sss'
import * as transitionDialogCSS from './transition-dialog.sss'

const getTranslateInParams = ({ translate, x = false, y = false }) => ({
  keyframes: [
    { translate, scale: x ? '0.9 1' : y ? '1 0.9' : '1 1', opacity: '0' },
    { translate: '0 0', scale: '1 1', opacity: '1' }
  ],
  options: {
    easing: 'cubic-bezier(0, 0, 0, 1)',
    fill: 'forwards' as FillMode,
    duration: 300
  }
})

const getTranslateOutParams = ({ translate }) => ({
  keyframes: [
    { translate: '0 0', opacity: '1' },
    { translate, opacity: '0' }
  ],
  options: {
    easing: 'cubic-bezier(0.3, 0, 1, 1)',
    fill: 'forwards' as FillMode,
    duration: 150
  }
})

const ANIMATION_PARAMS = {
  slideInRightAnimation: {
    enter: getTranslateInParams({ translate: '-48px 0', x: true }),
    exit: getTranslateOutParams({ translate: '-24px 0' })
  },
  slideInLeftAnimation: {
    enter: getTranslateInParams({ translate: '48px 0', x: true }),
    exit: getTranslateOutParams({ translate: '24px 0' })
  },
  slideInBottomAnimation: {
    enter: getTranslateInParams({ translate: '0 -24px', y: true }),
    exit: getTranslateOutParams({ translate: '0 -12px' })
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
            isIOS() && animationsCSS.forcedPerformance
          )}>
            {props.children}
          </div>
        </Show>
      </Transition>
    </Dialog>
  )
}
