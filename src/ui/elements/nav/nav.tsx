import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import barStyles from '../bar.sss'
import navStyles from './nav.sss'

type Props = {
  //active?: boolean
}

export const Nav: ParentComponent<Props> = (props) => {
  return (
    <nav class={clsx(
      barStyles.base,
      navStyles.base
    )}>
      {props.children}
    </nav>
  )
}
