import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { render } from 'solid-js/web'

import { handleErrors } from '~/utils'
handleErrors()

import { prefetchIcons } from '~/ui'
prefetchIcons()

import { useUserState } from '~/entities'
import { ROUTES, useRoutingState } from '~/routing'
import { RouteButton, RouteContainer } from '~/routing/components'
//import { AuthPane } from '~/features/auth/components'
import { Header, Main, Nav, ImageGroup, Logo } from '~/ui/components'

const App: Component = () => {
  const routingState = useRoutingState()
  const userState = useUserState()

  return (
    <>
      <Header>
        <ImageGroup>
          <Logo/>
        </ImageGroup>

        <Show when={!userState.authed}>
          <RouteButton route={ROUTES.auth} icon="user"/>
        </Show>
        <RouteButton route={ROUTES.settings} icon="settings"/>
      </Header>

      <Nav>
      </Nav>

      <Main>

      </Main>
    </>
  )
}

render(() => (
  <App/>
), self.document.body)
