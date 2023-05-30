import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import * as icons from '~/shared/icons'

import iconCSS from './icon.sss'

export type IconProps = {
  class?: string
  name: keyof typeof icons
  size: 'small' | 'medium' | 'large'
  viewBox?: string
}

export const Icon: Component<IconProps> = (props) => {
  return (
    <svg
      class={clsx(
        props.class,
        iconCSS.base,
        iconCSS[`_${props.size}`]
      )}
      viewBox={props.viewBox}
    >
      <use href={`#${icons[props.name].id}`}/>
    </svg>
  )
}
