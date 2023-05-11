import type { ParentComponent } from 'solid-js'

import asideStyles from './aside.sss'

export const Aside: ParentComponent = (props) => {
  return (
    <aside class={asideStyles.base}>
      {props.children}
    </aside>
  )
}
