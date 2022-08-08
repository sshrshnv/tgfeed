import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './button.sass'

export type Props = {
  class?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  error?: boolean
  onClick?: () => void
}

export const Button: ParentComponent<Props> = (props) => {
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
    </button>
  )
}
