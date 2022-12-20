import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

import { preloadIcons } from '~/ui'
preloadIcons()

import { useUserState } from '~/entities'
import { ROUTES } from '~/routing'
import { RouteButton, RouteContainer } from '~/routing/components'
import { AuthPopup } from '~/features/auth'
import { Header, Main, Nav, ImageGroup, Logo } from '~/ui/components'

const App: Component = () => {
  //const routingState = useRoutingState()
  const userState = useUserState()

  return (
    <>
      <Header>
        <ImageGroup>
          <Logo/>
        </ImageGroup>

        <Show when={!userState.authed}>
          <RouteButton route={ROUTES.authPopup} icon='user'/>
        </Show>
        <RouteButton route={ROUTES.settingsPopup} icon='settings'/>
      </Header>

      <Nav>
        <RouteButton route={ROUTES.feedPage('')} variant='nav' text='TgFeed'/>
      </Nav>

      <Main>

      </Main>
    </>
  )
}

render(() => (
  <App/>
), self.document.body)
