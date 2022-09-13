import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import * as icons from '~/ui/assets/icons'

import styles from './icon.sss'

export type IconProps = {
  class?: string
  icon: keyof typeof icons
}

export const Icon: Component<IconProps> = (props) => {
  return (
    <svg class={clsx(
      props.class,
      styles.base
    )}>
      <use href={`#${icons[props.icon].id}`}/>
    </svg>
  )
}
