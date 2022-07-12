import type { Component } from 'solid-js'
import { Show } from 'solid-js'

import { Image, Text } from '~/ui/elements'

import logoUrl from './logo.svg'
import classes from './logo.styl'

type Props = {
  icon?: boolean
  title?: boolean
}

export const Logo: Component<Props> = (props) => {
  return (
    <>
      <Show when={props.icon}>
        <Image
          class={classes.icon}
          src={logoUrl}
        />
      </Show>

      <Show when={props.title}>
        <Text
          element="h1"
          textAlign="center"
        >
          {process.env.APP_TITLE}
        </Text>
      </Show>
    </>
  )
}
