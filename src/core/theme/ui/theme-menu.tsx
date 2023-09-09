import type { Component } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements/menu'

import type { ThemeMode } from '../theme.types'
import { themeState, setThemeState } from '../theme-state'

type ThemeItem = {
  value: ThemeMode
  text?: string
}

export const ThemeMenu: Component = () => {
  const getItems = (): ThemeItem[] => [
    { value: 'system', text: localeState.texts?.theme.system },
    { value: 'light', text: localeState.texts?.theme.light },
    { value: 'dark', text: localeState.texts?.theme.dark }
  ]

  const handleChange = (mode: ThemeMode) => {
    setThemeState('mode', mode)
  }

  return (
    <>
      <MenuTitle
        text={localeState.texts?.theme.title}
      />
      <MenuRadioGroup
        value={themeState.mode}
        name='theme'
        items={getItems()}
        onChange={handleChange}
      />
    </>
  )
}
