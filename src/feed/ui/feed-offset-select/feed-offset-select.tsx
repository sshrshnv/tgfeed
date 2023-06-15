import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { routes } from '~/core/routes'
import { routing } from '~/shared/routing'
import { TransitionDialog, Text, Button, Icon } from '~/shared/ui/elements'
import { slideInBottomAnimation, slideOutTopAnimation } from '~/shared/ui/animations'

import { formatOffset } from './utils'
import * as feedOffsetSelectCSS from './feed-offset-select.sss'

export const FeedOffsetSelect: Component = () => {
  const isOpen = () => routing.currentRoute?.id === routes.feedOffsetSelect.id

  return (
    <div class={feedOffsetSelectCSS.base}>
      <Text
        class={feedOffsetSelectCSS.label}
        variant='label'
        size='small'
      >
        {formatOffset(locale.lang, 24, 'hour')}
      </Text>

      <Button
        class={feedOffsetSelectCSS.button}
        route={routes.feedOffsetSelect}
      >
        <Icon name='history' size='large'/>
      </Button>

      <TransitionDialog
        route={routes.feedOffsetSelect}
        class={feedOffsetSelectCSS.popover}
        open={isOpen()}
        inAnimation={slideInBottomAnimation}
        outAnimation={slideOutTopAnimation}
      >
        test
      </TransitionDialog>
    </div>
  )
}
