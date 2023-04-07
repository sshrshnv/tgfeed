import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import layoutStyles from '../layout.sss'
import headerStyles from './header.sss'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={clsx(
      layoutStyles.before,
      headerStyles.base
    )}>
      {props.children}
    </header>
  )
}
