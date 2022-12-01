import { createRenderEffect, createMemo } from 'solid-js'

import type { PromiseWrapper } from '~/utils'
import { loadModule, createPromiseWrapper } from '~/utils'

import type { LangTexts, LangTextsModuleName } from './lang.types'
import { setLangData } from './lang.data'
import { useLangState } from './lang.hooks'

const cachedLoaderPromises = {}

export const loadLangModule = async (
  langTextsModuleName: LangTextsModuleName
) => {
  if (cachedLoaderPromises[langTextsModuleName]) {
    return cachedLoaderPromises[langTextsModuleName]
  }

  cachedLoaderPromises[langTextsModuleName] = new self.Promise<void>(async (resolve) => {
    await createLangModuleLoader(langTextsModuleName)
    resolve()
  })

  return cachedLoaderPromises[langTextsModuleName]
}

const createLangModuleLoader = (
  langTextsModuleName: LangTextsModuleName
) => {
  let promiseWrapper: PromiseWrapper | null = createPromiseWrapper()
  const langState = useLangState()

  const getTextsModulePath = createMemo(() => {
    return `./packs/${langState.currentLang}/${langTextsModuleName}.texts.json`
  })

  createRenderEffect(() => {
    loadTextsModule(getTextsModulePath()).then(texts => {
      setLangData('texts', texts)

      if (!promiseWrapper) return
      promiseWrapper.resolve()
      promiseWrapper = null
    })
  })

  return promiseWrapper.promise
}

const loadTextsModule = (
  textsModulePath: string,
  cb?: (value?: Partial<LangTexts>) => void
) => loadModule<Partial<LangTexts>>(
  textsModulePath,
  () => import(`${textsModulePath}` /* webpackChunkName: 'texts.' */),
  cb
)
