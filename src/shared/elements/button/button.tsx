import type { ParentComponent } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import type { IconProps } from '~/shared/elements'
import { Text, Icon } from '~/shared/elements'

import layoutStyles from '../layout.sss'
import buttonStyles from './button.sss'

export type ButtonProps = {
  class?: string
  text?: string
  icon?: IconProps['icon']
  type?: 'button' | 'submit'
  role?: 'link'
  disabled?: boolean
  error?: boolean
  onClick?: () => void
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <button
      class={clsx(
        props.class,
        layoutStyles.flexCenter,
        buttonStyles.base,
        props.disabled && buttonStyles._disabled,
        props.error && buttonStyles._error
      )}
      type={props.type || 'button'}
      role={props.role}
      disabled={props.disabled}
      onClick={handleClick}
    >
      <Show when={!!props.text}>
        <Text variant='label' size='large'>
          {props.text}
        </Text>
      </Show>

      <Show when={!!props.icon}>
        <Icon icon={props.icon!}/>
      </Show>
    </button>
  )
}
