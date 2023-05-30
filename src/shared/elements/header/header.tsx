import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import layoutCSS from '../layout.sss'
import headerCSS from './header.sss'

export const Header: ParentComponent = (props) => {
  return (
    <header class={clsx(
      layoutCSS.flex,
      headerCSS.wrapper
    )}>
      <div class={clsx(
        layoutCSS.flex,
        headerCSS.base
      )}>
        {props.children}
      </div>
    </header>
  )
}
