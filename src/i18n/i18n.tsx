import type { FlowComponent } from 'solid-js'
import { createContext, useContext, createEffect, createMemo } from 'solid-js'

import { useSettings } from '~/store'

import { store } from './i18n.store'
import { i18nPromise, loadTexts } from './i18n.actions'
import type { Texts } from './texts'
import { INITIAL_TEXTS, templateText } from './texts'

const I18nContext = createContext({
  texts: INITIAL_TEXTS as Texts,
  t: templateText
})

const htmlEl = self.document.documentElement

export const I18n: FlowComponent = (props) => {
  const { settings } = useSettings()

  const getI18n = createMemo(() => ({
    texts: store[settings.lang] || INITIAL_TEXTS,
    t: templateText
  }))

  createEffect(() => {
    if (!settings.lang) return

    loadTexts(settings.lang)
    htmlEl.setAttribute('lang', settings.lang)
  })

  return (
    <I18nContext.Provider value={getI18n()}>
      {props.children}
    </I18nContext.Provider>
  )
}

export const waitI18n = () => i18nPromise

export const useI18n = () => useContext(I18nContext)
