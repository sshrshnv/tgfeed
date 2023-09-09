import type { Component } from 'solid-js'

import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements/menu'

import type { LocaleLang } from '../locale.types'
import { localeState, setLocaleState } from '../locale-state'
import { formatLocaleLang } from '../utils/format-locale-lang'

export const LocaleMenu: Component = () => {
  const getItems = () => (
    (process.env.APP_LOCALE_LANGS as unknown as [LocaleLang]).map(lang => ({
      value: lang,
      text: formatLocaleLang(lang)
    }))
  )

  const handleChange = (lang: LocaleLang) => {
    setLocaleState('lang', lang)
  }

  return (
    <>
      <MenuTitle
        text={localeState.texts?.locale.title}
      />
      <MenuRadioGroup
        value={localeState.lang}
        name='language'
        items={getItems()}
        onChange={handleChange}
      />
    </>
  )
}
