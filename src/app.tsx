import type { Component } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

import { Router, Route, RouteButton, useRouter } from '~/router'
import { Store } from '~/store'
import { I18n } from '~/i18n'

import { UIPreset } from '~/ui/preset'
import { LogoTitle, BgImage } from '~/ui/brand'
import { Header } from '~/ui/layout'

import {
  IntroPageLazy, FeedsPageLazy,
  AuthPaneLazy, UserPaneLazy, SettingsPaneLazy
} from '~/features'

const App: Component = () => {
  const { routes } = useRouter()

  return (
    <>
      <Header>
        <LogoTitle/>
        <RouteButton route={routes.user} icon="user"/>
        <RouteButton route={routes.settings} icon="settings"/>
      </Header>

      <BgImage/>

      <Route pageRoute={routes.intro} component={IntroPageLazy}/>
      <Route pageRoute={routes.feeds} component={FeedsPageLazy}/>

      <Route paneRoute={routes.auth} component={AuthPaneLazy}/>
      <Route paneRoute={routes.user} component={UserPaneLazy}/>
      <Route paneRoute={routes.settings} component={SettingsPaneLazy}/>
    </>
  )
}

render(() => (
  <Router>
    <Store>
      <I18n>
        <App/>
      </I18n>
      <UIPreset/>
    </Store>
  </Router>
), self.document.body)
