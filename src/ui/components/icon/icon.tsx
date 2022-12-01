import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import * as icons from '~/ui/assets/icons'

import styles from './icon.sss'

export type IconProps = {
  class?: string
  icon: keyof typeof icons
  viewBox?: string
}

export const Icon: Component<IconProps> = (props) => {
  return (
    <svg
      class={clsx(
        props.class,
        styles.base
      )}
      viewBox={props.viewBox}
    >
      <use href={`#${icons[props.icon].id}`}/>
    </svg>
  )
}
