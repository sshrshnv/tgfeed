import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { barCSS } from '~/ui/css'

import CSS from './nav.sss'

type Props = {
  //active?: boolean
}

export const Nav: ParentComponent<Props> = (props) => {
  return (
    <nav class={clsx(
      barCSS.base,
      CSS.base
    )}>
      {props.children}
    </nav>
  )
}
