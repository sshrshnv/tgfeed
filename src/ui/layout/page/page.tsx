import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { scrollStyles } from '~/ui/styles'

import styles from './page.sass'

type Props = {
  scrollable?: boolean
}

export const Page: ParentComponent<Props> = (props) => {

  return (
    <main class={clsx(
      styles.base,
      props.scrollable && clsx(scrollStyles.base, scrollStyles._hidden)
    )}>
      {props.children}
    </main>
  )
}
