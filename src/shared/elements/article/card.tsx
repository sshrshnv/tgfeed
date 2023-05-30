import type { ParentComponent } from 'solid-js'

import cardCSS from './card.sss'

type Props = {

}

export const Card: ParentComponent<Props> = (props) => {
  return (
    <div
      class={cardCSS.base}
    >
      {props.children}
    </div>
  )
}
