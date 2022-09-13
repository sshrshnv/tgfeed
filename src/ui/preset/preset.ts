import type { Component } from 'solid-js'

import { prefetchIcons } from './icons.preset'
import { preventContextMenu, preventDragAndDrop, preventScale } from './interactions.preset'
import { hadleThemeChange } from './theme.preset'

prefetchIcons()
preventContextMenu()
preventDragAndDrop()
preventScale()

export const UIPreset: Component = () => {
  hadleThemeChange()
  return null
}
