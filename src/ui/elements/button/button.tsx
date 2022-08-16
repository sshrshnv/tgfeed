import type { ParentComponent, Component } from 'solid-js'
import { Show } from 'solid-js/web'
import { clsx } from 'clsx'

import { Icon } from '~/ui/elements'

import styles from './button.sass'

export type Props = {
  class?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  error?: boolean
  view?: 'control'
  icon?: Component
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
        props.error && styles._error,
        props.view && styles[`_view-${props.view}`]
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
