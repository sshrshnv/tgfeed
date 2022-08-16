import type { Component } from 'solid-js'
import { createEffect } from 'solid-js'

import { Block } from '~/ui/layout'

import styles from './status.sass'

type Props = {
  loading: boolean
  onTransitionEnd?: () => void
}

export const Status: Component<Props> = (props) => {
  let element: HTMLDivElement

  createEffect((prevLoading) => {
    if (prevLoading && !props.loading) {
      element.onanimationiteration = () => {
        props.onTransitionEnd?.()
      }
    }
    return props.loading
  })
  return (
    <Block
      ref={element!}
      class={styles.base}
      fullWidth
      absolute
    />
  )
}
