import { render } from 'solid-js/web'

import type { Route } from '~/shared/routing'
import { routing } from '~/shared/routing'
import { Page, Main, Header, Button, headerStyles } from '~/shared/elements'

import { routes } from './routes'

const View = () => {


  return (
    <Page>
      <Header>
        <Button
          class={headerStyles.button}
          icon='menu'
        />
        <Button
          class={headerStyles.button}
          icon='settings'
        />
      </Header>
      <Main/>
    </Page>
  )
}

export const renderView = () => render(
  View,
  self.document.body
)
