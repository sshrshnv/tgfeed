import type { ParentComponent } from 'solid-js'

import pageStyles from './page.sss'

export const Page: ParentComponent = (props) => {
  return (
    <div class={pageStyles.base}>
      {props.children}
    </div>
  )
}
