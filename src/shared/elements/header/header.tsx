import type { ParentComponent } from 'solid-js'

import headerStyles from './header.sss'

export const Header: ParentComponent = (props) => {
  return (
    <header class={headerStyles.base}>
      {props.children}
    </header>
  )
}
