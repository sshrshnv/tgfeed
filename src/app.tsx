import type { Component } from 'solid-js'
import { render, Switch, Match } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

if (process.env.NODE_ENV === 'development') {
  require('~/ui/styles/global.styles.sass')
}

import { Router, useRouter } from '~/router'
import { Store } from '~/store'
import { I18n } from '~/i18n'

import {
  preventContextMenu,
  preventScale,
  preventDragAndDrop
} from '~/ui/utils'

import { LogoTitle, Background } from '~/ui/features'
import { Header, HeaderButton } from '~/ui/layout'
import { UserSVG, SettingsSVG } from '~/ui/icons'

import {
  IntroPageLazy, FeedsPageLazy,
  AuthPopupPageLazy, UserPopupPageLazy, SettingsPopupPageLazy
} from '~/features'

const App: Component = () => {
  const { router, routes } = useRouter()

  return (
    <>
      <Header>
        <LogoTitle/>
        <HeaderButton route={routes.user} icon={UserSVG}/>
        <HeaderButton route={routes.settings} icon={SettingsSVG}/>
      </Header>

      <Switch>
        <Match when={router.pageId === routes.intro.pageId}>
          <IntroPageLazy/>
        </Match>
        <Match when={router.pageId === routes.feeds.pageId}>
          <FeedsPageLazy/>
        </Match>
      </Switch>

      <Switch>
        <Match when={router.popupPageIds.includes(routes.auth.popupPageId)}>
          <AuthPopupPageLazy/>
        </Match>
        <Match when={router.popupPageIds.includes(routes.user.popupPageId)}>
          <UserPopupPageLazy/>
        </Match>
        <Match when={router.popupPageIds.includes(routes.settings.popupPageId)}>
          <SettingsPopupPageLazy/>
        </Match>
      </Switch>

      <Background/>
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
