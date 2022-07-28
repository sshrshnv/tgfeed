import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { scrollStyles } from '~/ui/css/styles'

import styles from './main.sass'

type Props = {
  scrollable?: boolean
}

export const Main: ParentComponent<Props> = (props) => {

  return (
    <main class={clsx(
      styles.base,
      props.scrollable && scrollStyles.hiddenScroll
    )}>
      {props.children}
    </main>
  )
}
