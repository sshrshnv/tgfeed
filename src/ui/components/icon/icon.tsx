import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import * as ICONS from '~/ui/assets/icons'

import CSS from './icon.sss'

export type IconProps = {
  class?: string
  icon: keyof typeof ICONS
  viewBox?: string
}

export const Icon: Component<IconProps> = (props) => {
  return (
    <svg
      class={clsx(
        props.class,
        CSS.base
      )}
      viewBox={props.viewBox}
    >
      <use href={`#${ICONS[props.icon].id}`}/>
    </svg>
  )
}
