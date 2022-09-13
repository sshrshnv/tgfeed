import type { FlowComponent } from 'solid-js'
import { createContext, useContext, createEffect } from 'solid-js'

import { useSettings } from '~/store'

import type { Texts } from './i18n.texts'
import { INITIAL_TEXTS, templateText } from './i18n.texts'
import { store } from './i18n.store'
import { i18nPromise, loadLangTexts } from './i18n.actions'

const I18nContext = createContext({
  texts: INITIAL_TEXTS as Texts,
  t: templateText
})

const htmlEl = self.document.documentElement

export const I18n: FlowComponent = (props) => {
  const { settings } = useSettings()

  createEffect(() => {
    if (!settings.lang) return

    loadLangTexts(settings.lang)
    htmlEl.setAttribute('lang', settings.lang)
  })

  return (
    <I18nContext.Provider value={store}>
      {props.children}
    </I18nContext.Provider>
  )
}

export const waitI18n = () => i18nPromise

export const useI18n = () => useContext(I18nContext)
