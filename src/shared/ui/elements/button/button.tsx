import { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { pushRoute } from '~/shared/routing'

import * as layoutCSS from '../layout.sss'
import * as buttonCSS from './button.sss'

export type ButtonProps = ComponentProps<'button'> & {
  route?: Route
}

export const Button: ParentComponent<ButtonProps> = (_props) => {
  const [props, buttonProps] = splitProps(_props, [
    'route', 'class', 'type', 'onClick'
  ])

  const handleClick = (ev) => {
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
      return
    }
    if (props.route) pushRoute(props.route)
  }

  return (
    <button {...buttonProps}
      class={clsx(
        props.class,
        buttonCSS.base,
        layoutCSS.outline,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
      type={props.type || 'button'}
      onClick={handleClick}
    />
  )
}
