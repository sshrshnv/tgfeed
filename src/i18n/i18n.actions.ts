import { setStore } from './i18n.store'

let resolveI18nPromise: (value?: unknown) => void
export let i18nPromise: Promise<unknown> | null = new Promise(resolve =>
  resolveI18nPromise = resolve
)

const loadedTexts = {}

export const loadLangTexts = async (lang: string) => {
  if (loadedTexts[lang]) {
    setStore('texts', loadedTexts[lang])
    return
  }

  const { default: texts } = await import(
    /* webpackChunkName: 'texts.' */
    `~/i18n/${lang}/texts.json`
  )
  setStore('texts', texts)

  if (!!i18nPromise) {
    resolveI18nPromise()
    i18nPromise = null
  }
}
