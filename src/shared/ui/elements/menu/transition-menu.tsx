import type { ParentComponent } from 'solid-js'
import { Show, createSignal, splitProps } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing'
import { isIOS } from '~/shared/utils'

import type { MenuProps } from './menu'
import { Menu } from './menu'
import * as animationsCSS from '../animations.sss'
import * as transitionMenuCSS from './transition-menu.sss'

export type TransitionMenuProps = MenuProps & {
  route: Route
  class?: string
  open?: boolean
}

export const TransitionMenu: ParentComponent<TransitionMenuProps> = (_props) => {
  const [props, menuProps] = splitProps(_props, [
    'route', 'class', 'open'
  ])

  return (
    <Transition
      enterClass={transitionMenuCSS._enter}
      exitClass={transitionMenuCSS._exit}
      enterActiveClass={transitionMenuCSS._enterActive}
      exitActiveClass={transitionMenuCSS._exitActive}
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
