import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'

import { localeState } from '~/core/locale'
import { feedRoutes } from '~/feed'
import { routing } from '~/shared/routing'
import {
  TransitionDialog, Text, Button, Icon,
  Menu, MenuTitle, MenuRadioGroup
} from '~/shared/ui/elements'

import { formatOffset } from './utils'
import * as feedOffsetSelectCSS from './feed-offset-select.sss'

export const FeedOffsetSelect: Component = () => {
  const getItems = createMemo(() => [
    { value: 12, text: formatOffset(localeState.lang, 12, 'hour', 'long') },
    { value: 24, text: formatOffset(localeState.lang, 24, 'hour', 'long') },
    { value: 24 * 2, text: formatOffset(localeState.lang, 2, 'day', 'long') },
    { value: 24 * 7, text: formatOffset(localeState.lang, 7, 'day', 'long') },
  ])

  const isOpen = createMemo(() =>
    routing.currentRoute?.id === feedRoutes.offsetSelectPopover.id
  )

  const handleChange = () => {
    //
  }

  return (
    <div class={feedOffsetSelectCSS.base}>
      <Text
        class={feedOffsetSelectCSS.label}
        variant='label'
        size='small'
      >
        {formatOffset(localeState.lang, 24, 'hour')}
      </Text>

      <Button
        class={feedOffsetSelectCSS.button}
        route={feedRoutes.offsetSelectPopover}
      >
        <Icon name='history' size='large'/>
      </Button>

      <TransitionDialog
        route={feedRoutes.offsetSelectPopover}
        class={feedOffsetSelectCSS.popover}
        open={isOpen()}
        animation='slideInBottomAnimation'
      >
        <Menu>
          <MenuTitle
            text='Feed for the last'
          />
          <MenuRadioGroup
            value={24}
            name='feed-offset'
            items={getItems()}
            onChange={handleChange}
          />
        </Menu>
      </TransitionDialog>
    </div>
  )
}
