import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'

import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements'

import type { LocaleLang } from '../../locale.types'
import { locale } from '../../locale.state'
import { changeLocale } from '../../actions'

export const LocaleMenu: Component = () => {
  const getItems = createMemo(() =>
    (process.env.APP_LOCALE_LANGS as unknown as [LocaleLang]).map(lang => ({
      value: lang, text: new Intl.DisplayNames([lang], { type: 'language' }).of(lang)
    }))
  )

  const handleChange = (lang: LocaleLang) => {
    changeLocale({ lang })
  }

  return (
    <>
      <MenuTitle
        text={locale.texts?.locale.title}
      />
      <MenuRadioGroup
        value={locale.lang}
        name='language'
        items={getItems()}
        onChange={handleChange}
      />
    </>
  )
}
