import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { LogoIconPaths } from './logo-icon-paths'
import styles from './logo-icon.sass'

type Props = {
  class?: string
}

export const LogoIcon: Component<Props> = (props) => {
  return (
    <svg
      class={clsx(
        props.class,
        styles.base
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 320"
      fill="none"
    >
      <LogoIconPaths/>
    </svg>
  )
}
