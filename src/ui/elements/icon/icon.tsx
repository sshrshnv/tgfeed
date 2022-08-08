import type { Component } from 'solid-js'
import { children, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import styles from './icon.sass'

type Props = {
  class?: string
  icon: Component
}

const EMPTY_PROPS = {}

export const Icon: Component<Props> = (props) => {
  const iconMemo = children(() => props.icon(EMPTY_PROPS))

  createEffect(() => {
    const icon = iconMemo()
    if (!(icon instanceof SVGElement)) return

    icon.setAttribute('class', clsx(
      props.class,
      styles.base
    ))
  })

  return (
    <>{iconMemo()}</>
  )
}
