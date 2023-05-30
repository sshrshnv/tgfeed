import type { ParentComponent } from 'solid-js'

import mainCSS from './main.sss'

export const Main: ParentComponent = (props) => {
  return (
    <main class={mainCSS.base}>
      {props.children}
    </main>
  )
}
