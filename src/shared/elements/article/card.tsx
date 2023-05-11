import type { ParentComponent } from 'solid-js'

import cardStyles from './card.sss'

type Props = {

}

export const Card: ParentComponent<Props> = (props) => {
  return (
    <div
      class={cardStyles.base}
    >
      {props.children}
    </div>
  )
}
