import type { Component } from 'solid-js'

import { Badge } from '~/shared/ui/elements/badge'

import * as coreMenuBadgeCSS from './core-menu-badge.sss'

export const CoreMenuBadge: Component = () => {
  return (
    <Badge
      class={coreMenuBadgeCSS.base}
      text='!'
    />
  )
}
