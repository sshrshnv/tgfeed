import type { ParentComponent } from 'solid-js'

import { Block } from '~/ui/elements'

type Props = {}

export const PanelHeader: ParentComponent<Props> = (props) => {
  return (
    <Block>
      {props.children}
    </Block>
  )
}
