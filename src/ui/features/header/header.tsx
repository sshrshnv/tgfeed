import type { ParentComponent } from 'solid-js'

import { Block } from '~/ui/elements'
import { LogoTitle } from '~/ui/features'

import styles from './header.sass'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={styles.base}>
      <Block
        class={styles.content}
        flex
        flexAlignCenter
        fullWidth
        fullHeight
      >
        <LogoTitle/>
        {props.children}
      </Block>
    </header>
  )
}
