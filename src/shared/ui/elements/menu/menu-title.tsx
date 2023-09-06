import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements/text'

import * as menuTitleCSS from './menu-title.sss'

export type MenuTitleProps = {
  class?: string
  text?: string
}

export const MenuTitle: Component<MenuTitleProps> = (props) => {
  return (
    <Text
      class={clsx(
        props.class,
        menuTitleCSS.base
      )}
      variant='label'
      size='small'
    >
      {props.text}
    </Text>
  )
}
