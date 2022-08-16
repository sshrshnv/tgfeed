import type { Component } from 'solid-js'

import { Block } from '~/ui/layout'

import styles from './loader.sass'

type Props = {
  absolute?: boolean
}

export const Loader: Component<Props> = (props) => {
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
