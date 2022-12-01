import type { ParentComponent } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import type { IconProps } from '~/ui/components'
import { Icon } from '~/ui/components'
import layoutStyles from '~/ui/styles/layout.styles.sss'

import styles from './button.sss'

export type ButtonProps = {
  class?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  error?: boolean
  icon?: IconProps['icon']
  onClick?: () => void
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <button
      class={clsx(
        layoutStyles.flexCenter,
        props.class,
        styles.base,
        props.disabled && styles._disabled,
        props.error && styles._error
      )}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}

      <Show when={!!props.icon}>
        <Icon icon={props.icon!}/>
      </Show>
    </button>
  )
}
