import type { ParentComponent, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as headerCSS from './header.sss'

export type HeaderProps = ComponentProps<'header'>

export const Header: ParentComponent<HeaderProps> = (props) => {
  return (
    <header {...props}
      class={clsx(
        props.class,
        headerCSS.base,
        layoutCSS.flex
      )}
    >
      {props.children}
    </header>
  )
}
