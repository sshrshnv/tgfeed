import type { ParentComponent } from 'solid-js'

import * as mainCSS from './main.sss'

export const Main: ParentComponent = (props) => {
  return (
    <main class={mainCSS.base}>
      {props.children}
    </main>
  )
}
