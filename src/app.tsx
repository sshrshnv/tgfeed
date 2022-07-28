import type { Component } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

if (process.env.NODE_ENV === 'development') {
  require('~/ui/css/styles/global.styles.sass')
}

import { StoreProvider } from '~/store'
import { I18nProvider, setLangAttribute } from '~/i18n'
//import { setThemeAttribute } from '~/ui/css'
import { preventContextMenu, preventScale, preventDragAndDrop } from '~/ui/utils'
import { Header, Background } from '~/ui/features'
import { LandingLazy } from '~/features'

const App: Component = () => {
  return (
    <>
      <Header/>
      <LandingLazy/>
      <Background/>
    </>
  )
}

setLangAttribute()
//setThemeAttribute()

preventContextMenu()
preventScale()
preventDragAndDrop()

render(() => (
  <StoreProvider>
    <I18nProvider>
      <App/>
    </I18nProvider>
  </StoreProvider>
), self.document.body)
