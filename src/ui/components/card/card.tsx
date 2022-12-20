import type { ParentComponent } from 'solid-js'

import CSS from './card.sss'

type Props = {

}

export const Card: ParentComponent<Props> = (props) => {
  return (
    <div
      class={CSS.base}
    >
      {props.children}
    </div>
  )
}
