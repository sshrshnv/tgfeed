import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'

import { locale } from '~/core/locale'
import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements'

import type { ThemeMode } from '../../theme.types'
import { theme } from '../../theme.state'
import { changeTheme } from '../../actions'

export const ThemeMenu: Component = () => {
  const getItems = createMemo(() => [
    { value: 'system', text: locale.texts?.theme.system },
    { value: 'light', text: locale.texts?.theme.light },
    { value: 'dark', text: locale.texts?.theme.dark }
  ])

  const handleChange = (mode: ThemeMode) => {
    changeTheme({ mode })
  }

  return (
    <>
      <MenuTitle
        text={locale.texts?.theme.title}
      />
      <MenuRadioGroup
        value={theme.mode}
        name='theme'
        items={getItems()}
        onChange={handleChange}
      />
    </>
  )
}
