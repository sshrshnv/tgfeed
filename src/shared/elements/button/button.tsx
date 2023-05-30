import type { ParentComponent, JSX } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import type { IconProps } from '~/shared/elements'
import { Text, Icon } from '~/shared/elements'

import layoutCSS from '../layout.sss'
import buttonCSS from './button.sss'

export type ButtonProps = {
  class?: string
  text?: string
  iconName?: IconProps['name']
  iconSize?: IconProps['size']
  type?: 'button' | 'submit'
  role?: 'link'
  disabled?: boolean
  error?: boolean
  onClick?: () => void
} & JSX.AriaAttributes

export const Button: ParentComponent<ButtonProps> = (props) => {
  const handleClick = (ev) => {
    ev.preventDefault()
    props.onClick?.()
  }

  return (
    <button
      class={clsx(
        props.class,
        layoutCSS.flex,
        layoutCSS.flexCenter,
        buttonCSS.base,
        props.disabled && buttonCSS._disabled,
        props.error && buttonCSS._error
      )}
      type={props.type || 'button'}
      role={props.role}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}

      <Show when={!!props.text}>
        <Text variant='label' size='large'>
          {props.text}
        </Text>
      </Show>

      <Show when={!!props.iconName}>
        <Icon
          name={props.iconName!}
          size={props.iconSize || 'large'}
        />
      </Show>
    </button>
  )
}
