import { render } from 'solid-js/web'

import type { Route } from '~/shared/routing'
import { routing } from '~/shared/routing'
import {
  Main, Header, Button, Dropdown, Chip, Icon,
  headerCSS
} from '~/shared/elements'

import { routes } from './routes'

const View = () => {


  return (
    <>
      <Header>
        <Button class={headerCSS.button}>
          <Icon name='menu' size='large'/>
        </Button>

        <Chip class={headerCSS.chip} text='24 hours'/>
        <Button class={headerCSS.button}>
          <Icon name='history' size='large'/>
        </Button>

      </Header>

      <Main/>
    </>
  )
}

export const renderView = () => render(
  View,
  self.document.body
)
