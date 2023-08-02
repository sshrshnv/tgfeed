import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'

import { localeState } from '~/core/locale'
import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements'

import type { ThemeMode } from '../theme.types'
import { themeState, setThemeState } from '../theme-state'

export const ThemeMenu: Component = () => {
  const getItems = createMemo(() => [
    { value: 'system', text: localeState.texts?.theme.system },
    { value: 'light', text: localeState.texts?.theme.light },
    { value: 'dark', text: localeState.texts?.theme.dark }
  ])

  const handleChange = (mode: ThemeMode) => {
    setThemeState({ mode })
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
