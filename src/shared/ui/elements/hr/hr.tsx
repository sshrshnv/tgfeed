import type { Component, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as hrCSS from './hr.sss'

export type HRProps = ComponentProps<'hr'>

export const HR: Component<HRProps> = (props) => {
  return (
    <hr class={clsx(
      props.class,
      hrCSS.base
    )}/>
  )
}
