import { store, setStore } from './i18n.store'

let resolveI18nPromise: (value?: unknown) => void

export let i18nPromise: Promise<unknown> | null = new Promise(resolve =>
  resolveI18nPromise = resolve
)

export const loadTexts = async (lang: string) => {
  if (store[lang]) return

  const { default: texts } = await import(
    /* webpackChunkName: 'texts.' */
    `~/i18n/texts/${lang}/texts.json`
  )
  setStore(lang, texts)

  if (!!i18nPromise) {
    resolveI18nPromise()
    i18nPromise = null
  }
}
