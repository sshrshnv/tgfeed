import type { ParentComponent } from 'solid-js'

import CSS from './main.sss'

export const Main: ParentComponent = (props) => {
  return (
    <main class={CSS.base}>
      {props.children}
    </main>
  )
}
