import type { ParentComponent } from 'solid-js'
import { Show } from 'solid-js/web'
import { clsx } from 'clsx'

import type { IconProps } from '~/ui/elements'
import { Icon } from '~/ui/elements'

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
        <Icon class={styles.icon} icon={props.icon!}/>
      </Show>
    </button>
  )
}
