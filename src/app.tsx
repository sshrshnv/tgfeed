import type { Component } from 'solid-js'
import { render } from 'solid-js/web'

import { StoreProvider } from '~/store'
import { I18nProvider, setLangAttribute } from '~/i18n'
import { setThemeAttribute } from '~/ui/styles'
import { preventContextMenu, preventScale, preventDragAndDrop } from '~/ui/utils'
import { Header, Logo, Background } from '~/ui/elements'
import { LandingLazy } from '~/features'

const App: Component = () => {
  return (
    <>
      <Header>
        <Logo/>
      </Header>

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
  <StoreProvider>
    <I18nProvider>
      <App/>
    </I18nProvider>
  </StoreProvider>
), self.document.body)
