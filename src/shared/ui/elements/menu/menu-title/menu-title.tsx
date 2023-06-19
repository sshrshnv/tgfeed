import type { Component } from 'solid-js'

import { Text } from '~/shared/ui/elements'

import * as menuTitleCSS from './menu-title.sss'

export type MenuTitleProps = {
  text?: string
}

export const MenuTitle: Component<MenuTitleProps> = (props) => {
  return (
    <Text
      class={menuTitleCSS.base}
      variant='label'
      size='small'
    >
      {props.text}
    </Text>
  )
}
