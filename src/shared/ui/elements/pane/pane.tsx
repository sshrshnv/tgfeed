import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { Header, Button, Icon, Text } from '~/shared/ui/elements'

import * as layoutCSS from '../layout.sss'
import * as dialogCSS from './dialog.sss'

export type DialogProps = {
  title: string
  first?: boolean
  onClose: () => void
}

export const dialog: ParentComponent<DialogProps> = (props) => {
  return (
    <div class={clsx(
      props.first && dialogCSS._first,
      dialogCSS.base,
      layoutCSS.flex
    )}>
      <Header class={dialogCSS.header}>
        <Button
          class={dialogCSS.button}
          onClick={props.onClose}
        >
          <Icon name='back' size='large'/>
        </Button>

        <Text variant='title' size='medium'>
          {props.title}
        </Text>

        <Button
          class={dialogCSS.button}
          onClick={props.onClose}
        >
          <Icon name='close' size='large'/>
        </Button>
      </Header>

      {props.children}
    </div>
  )
}
