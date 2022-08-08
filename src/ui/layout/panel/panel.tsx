import type { ParentComponent } from 'solid-js'
import { Portal } from 'solid-js/web'

import { Block } from '~/ui/elements'

import { PanelHeader } from './panel-header'
import styles from './panel.sass'

type Props = {
  title?: string
}

const bodyEl = self.document.body

export const Panel: ParentComponent<Props> = (props) => {
  return (
    <Portal mount={bodyEl}>
      <Block
        absolute
        fullHeight
      >
        <PanelHeader>
          {props.title}
        </PanelHeader>

        {props.children}
      </Block>
    </Portal>
  )
}
