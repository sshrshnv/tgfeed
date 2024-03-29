import type { ParentComponent } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { getTranslateInParams, getTranslateOutParams } from '~/shared/ui/animations'

import type { MenuProps } from './menu'
import { Menu } from './menu'

import * as animationsCSS from '~/shared/ui/animations/animations.sss'
import * as transitionMenuCSS from './transition-menu.sss'

export type TransitionMenuProps = MenuProps & {
  route: Route
  class?: string
  open?: boolean
  onAfterEnter?: TransitionProps['onAfterEnter']
  onBeforeExit?: TransitionProps['onBeforeExit']
}

const ANIMATION_PARAMS = {
  enter: getTranslateInParams({ translate: '48px, 0' }),
  exit: getTranslateOutParams({ translate: '24px, 0' })
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
            animationsCSS.forcedPerformance
          )}
        />
      </Show>
    </Transition>
  )
}
