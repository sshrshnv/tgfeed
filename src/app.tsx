import type { Component } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

import { StoreProvider } from '~/store'
import { I18nProvider, setLangAttribute } from '~/i18n'
import { setThemeAttribute } from '~/ui/styles'
import { ScreenMQProvider, preventContextMenu, preventScale, preventDragAndDrop } from '~/ui/utils'
import { Background } from '~/ui/elements'
import { LandingLazy } from '~/features'

const App: Component = () => {
  return (
    <>
      <LandingLazy/>

      <Background/>
    </>
  )
}

setLangAttribute()
setThemeAttribute()

preventContextMenu()
preventScale()
preventDragAndDrop()

render(() => (
  <ScreenMQProvider>
    <StoreProvider>
      <I18nProvider>
        <App/>
      </I18nProvider>
    </StoreProvider>
  </ScreenMQProvider>
), self.document.body)
