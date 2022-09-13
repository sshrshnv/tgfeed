import type { Component } from 'solid-js'
import { createEffect } from 'solid-js'

import { Block } from '~/ui/layout'

import styles from './linear-progress.sss'

export type LinearProgressProps = {
  active: boolean
  onTransitionEnd?: () => void
}

export const LinearProgress: Component<LinearProgressProps> = (props) => {
  let element: HTMLDivElement

  createEffect((prevActive) => {
    if (prevActive && !props.active) {
      element.onanimationiteration = () => {
        props.onTransitionEnd?.()
      }
    }
    return props.active
  })

  return (
    <Block
      ref={element!}
      class={styles.base}
      absolute
    />
  )
}
