import type { Component, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as menuCSS from './menu.sss'

export type MenuProps = ComponentProps<'menu'>

export const Menu: Component<MenuProps> = (props) => {
  return (
    <menu class={clsx(
      props.class,
      menuCSS.base,
      layoutCSS.flex
    )}>
      {props.children}
    </menu>
  )
}
