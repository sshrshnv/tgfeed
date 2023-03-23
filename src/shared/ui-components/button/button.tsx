import type { ParentComponent } from 'solid-js'
import { createMemo, Show } from 'solid-js'
import { clsx } from 'clsx'

import type { TextProps, IconProps } from '~/ui/components'
import { Text, Icon } from '~/ui/components'

import layoutStyles from '../layout.sss'
import styles from './button.sss'

export type ButtonProps = {
  variant?: 'nav'
  text?: string
  icon?: IconProps['icon']
  type?: 'button' | 'submit'
  disabled?: boolean
  error?: boolean
  onClick?: () => void
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  const getTextProps = createMemo<TextProps>(() => {
    switch (props.variant) {
    case 'nav':
      return { variant: 'title', size: 'small' }
    default:
      return { variant: 'label', size: 'medium' }
    }
  })

  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <button
      class={clsx(
        layoutStyles.flexCenter,
        styles.base,
        styles[`_${props.variant}`],
        props.disabled && styles._disabled,
        props.error && styles._error
      )}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={handleClick}
    >
      <Show when={!!props.text}>
        <Text {...getTextProps()}>
          {props.text}
        </Text>
      </Show>

      <Show when={!!props.icon}>
        <Icon icon={props.icon!}/>
      </Show>
    </button>
  )
}
