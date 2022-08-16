import type { Component } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

if (process.env.NODE_ENV === 'development') {
  require('~/ui/styles/global.styles.sass')
}

import { Router, Route, RouteButton, useRouter } from '~/router'
import { Store } from '~/store'
import { I18n } from '~/i18n'
import {
  preventContextMenu,
  preventScale,
  preventDragAndDrop
} from '~/utils'

import { TitleIcon, BgImage } from '~/ui/brand'
import { Header } from '~/ui/layout'
import { UserSVG, SettingsSVG } from '~/ui/icons'

import {
  IntroPageLazy, FeedsPageLazy,
  AuthPopupPageLazy, UserPopupPageLazy, SettingsPopupPageLazy
} from '~/features'

const App: Component = () => {
  const { routes } = useRouter()

  return (
    <>
      <Header>
        <TitleIcon/>
        <RouteButton route={routes.user} icon={UserSVG} view="control"/>
        <RouteButton route={routes.settings} icon={SettingsSVG} view="control"/>
      </Header>

      <Route pageRoute={routes.intro} component={IntroPageLazy}/>
      <Route pageRoute={routes.feeds} component={FeedsPageLazy}/>

      <Route popupPageRoute={routes.auth} component={AuthPopupPageLazy}/>
      <Route popupPageRoute={routes.user} component={UserPopupPageLazy}/>
      <Route popupPageRoute={routes.settings} component={SettingsPopupPageLazy}/>

      <BgImage/>
    </>
  )
}

preventContextMenu()
preventScale()
preventDragAndDrop()

render(() => (
  <Router>
    <Store>
      <I18n>
        <App/>
      </I18n>
    </Store>
  </Router>
), self.document.body)
