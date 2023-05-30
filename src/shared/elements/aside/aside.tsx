import type { ParentComponent } from 'solid-js'

import asideCSS from './aside.sss'

export const Aside: ParentComponent = (props) => {
  return (
    <aside class={asideCSS.base}>
      {props.children}
    </aside>
  )
}
