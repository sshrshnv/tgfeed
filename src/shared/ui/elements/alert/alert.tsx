import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import * as alertCSS from './alert.sss'

export type AlertProps = {
  class?: string
  active?: boolean
  dialog?: boolean
}

export const Alert: ParentComponent<AlertProps> = (props) => {
  return (
    <div
      class={clsx(
        props.class,
        props.active && alertCSS._active,
        alertCSS.base
      )}
      role={props.dialog ? 'alertdialog' : 'alert'}
    >
      {props.children}
    </div>
  )
}
