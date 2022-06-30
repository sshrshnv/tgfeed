import type { Component } from 'solid-js'

import { Block, Image } from '~/ui/elements'

import logoUrl from './logo.svg'
import classes from './logo.styl'

type Props = {

}

export const Logo: Component<Props> = () => {
  return (
    <Block
      class={classes.root}
      flex
      flexAlign='center'
      height='100%'
    >
      <Image
        class={classes.image}
        src={logoUrl}
      />
      {process.env.APP_TITLE}
    </Block>
  )
}
