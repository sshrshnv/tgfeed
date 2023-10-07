import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements/text'

import * as layoutCSS from '../layout.sss'
import * as badgeCSS from './badge.sss'

export type BadgeProps = {
  class?: string
  text?: string
}

export const Badge: ParentComponent<BadgeProps> = (props) => {
  return (
    <span class={clsx(
      props.class,
      badgeCSS.base,
      layoutCSS.flex,
      layoutCSS.flexCenter
    )}>
      <Text variant='label' size='small'>
        {props.text}
      </Text>
    </span>
  )
}
