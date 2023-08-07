import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements'

import * as menuDescriptionCSS from './menu-description.sss'

export type MenuDescriptionProps = {
  class?: string
  text?: string
}

export const MenuDescription: Component<MenuDescriptionProps> = (props) => {
  return (
    <Text
      class={clsx(
        props.class,
        menuDescriptionCSS.base
      )}
      variant='label'
      size='medium'
    >
      {props.text}
    </Text>
  )
}
