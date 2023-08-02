import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as scrollCSS from '../scroll.sss'
import * as layoutCSS from '../layout.sss'
import * as menuCSS from './menu.sss'

export type MenuProps = ComponentProps<'menu'> & {
  scrollable?: boolean
}

export const Menu: Component<MenuProps> = (_props) => {
  const [props, menuProps] = splitProps(_props, [
    'class', 'scrollable'
  ])

  return (
    <menu {...menuProps}
      class={clsx(
        props.class,
        props.scrollable && [scrollCSS.base, scrollCSS._hidden],
        menuCSS.base,
        layoutCSS.flex
      )}
    />
  )
}
