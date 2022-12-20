import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { barCSS } from '~/ui/css'

import CSS from './header.sss'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={clsx(
      barCSS.base,
      CSS.base
    )}>
      {props.children}
    </header>
  )
}
