import type { ParentComponent } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { isIOS } from '~/shared/utils'

import type { MenuProps } from './menu'
import { Menu } from './menu'

import * as animationsCSS from '../animations.sss'
import * as transitionMenuCSS from './transition-menu.sss'

export type TransitionMenuProps = MenuProps & {
  route: Route
  class?: string
  open?: boolean
  onAfterEnter?: TransitionProps['onAfterEnter']
  onBeforeExit?: TransitionProps['onBeforeExit']
}

const getTranslateInParams = ({ translate }) => ({
  keyframes: [
    { translate, opacity: '0' },
    { translate: '0', opacity: '1' }
  ],
  options: {
    easing: 'cubic-bezier(0, 0, 0, 1)',
    fill: 'forwards' as FillMode,
    duration: 300
  }
})

const getTranslateOutParams = ({ translate }) => ({
  keyframes: [
    { translate: '0', opacity: '1' },
    { translate, opacity: '0' }
  ],
  options: {
    easing: 'cubic-bezier(0.3, 0, 1, 1)',
    fill: 'forwards' as FillMode,
    duration: 150
  }
})

const ANIMATION_PARAMS = {
  enter: getTranslateInParams({ translate: '48px' }),
  exit: getTranslateOutParams({ translate: '24px' })
}

export const TransitionMenu: ParentComponent<TransitionMenuProps> = (_props) => {
  const [props, menuProps] = splitProps(_props, [
    'route', 'class', 'open', 'onAfterEnter', 'onBeforeExit'
  ])

  const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.enter
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  const handleExit: TransitionProps['onExit'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.exit
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  return (
    <Transition
      onEnter={handleEnter}
      onAfterEnter={props.onAfterEnter}
      onBeforeExit={props.onBeforeExit}
      onExit={handleExit}
    >
      <Show when={props.open}>
        <Menu {...menuProps}
          class={clsx(
            props.class,
            transitionMenuCSS.animated,
            isIOS() && animationsCSS.forcedPerformance
          )}
        />
      </Show>
    </Transition>
  )
}
