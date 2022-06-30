import type { FlowComponent } from 'solid-js'

import classes from './header.styl'

type Props = {

}

export const Header: FlowComponent<Props> = (props) => {
  return (
    <header
      class={classes.root}
    >
      {props.children}
    </header>
  )
}
