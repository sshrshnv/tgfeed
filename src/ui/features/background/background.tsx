import type { Component } from 'solid-js'

import { LogoIcon } from '~/ui/features'

import styles from './background.sass'

export const Background: Component = () => {
  return (
    <LogoIcon class={styles.base}/>
  )
}
