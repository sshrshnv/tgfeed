import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/ui/elements'
import { Block } from '~/ui/layout'
import { actionBarStyles, animationStyles } from '~/ui/styles'

import styles from './pane-header.sss'

type Props = {
  title: string
}

export const PaneHeader: ParentComponent<Props> = (props) => {
  return (
    <Block
      class={clsx(
        styles.base,
        actionBarStyles.base,
        actionBarStyles._top,
        animationStyles.performance
      )}
      absolute
      fullWidth
    >
      <Text class={styles.title}>
        {props.title}
      </Text>

      {props.children}
    </Block>
  )
}
