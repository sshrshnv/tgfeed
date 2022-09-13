import type { Component } from 'solid-js'

import { Block } from '~/ui/layout'

import styles from './circular-progress.sss'

export type CircularProgressProps = {
  absolute?: boolean
}

export const CircularProgress: Component<CircularProgressProps> = (props) => {
  return (
    <Block
      class={styles.base}
      absolute={props.absolute}
      flex
      flexJustifyCenter
      flexAlignCenter
    />
  )
}
