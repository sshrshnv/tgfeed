import type { ParentComponent } from 'solid-js'

import mainStyles from './main.sss'

export const Main: ParentComponent = (props) => {
  return (
    <main class={mainStyles.base}>
      {props.children}
    </main>
  )
}
