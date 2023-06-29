import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { locale } from '~/core/locale'
import { feedRoutes } from '~/feed/feed.routes'
import { routing } from '~/shared/routing'
import { TransitionDialog, Input, Icon } from '~/shared/ui/elements'

import * as feedChannelSearchCSS from './feed-channel-search.sss'
import * as feedChannelSearchDialogCSS from './feed-channel-search-dialog.sss'

export type FeedChannelSearchDialogProps = {
  open?: boolean
}

export const FeedChannelSearchDialog: Component<FeedChannelSearchDialogProps> = () => {
  const isOpen = createMemo(() =>
    routing.currentRoute?.id === feedRoutes.channelSearchPopover.id
  )

  return (
    <TransitionDialog
      class={feedChannelSearchDialogCSS.popover}
      wrapperClass={feedChannelSearchDialogCSS.wrapper}
      route={feedRoutes.channelSearchPopover}
      open={isOpen()}
      animation='slideInBottomAnimation'
      staticChildren={(
        <div class={clsx(
          feedChannelSearchCSS.base,
          feedChannelSearchDialogCSS.staticBase,
          feedChannelSearchDialogCSS[isOpen() ? 'fadeInAnimation' : 'fadeOutAnimation']
        )}>
          <Icon
            class={feedChannelSearchCSS.icon}
            name='search'
            size='large'
          />
          <Input
            class={feedChannelSearchDialogCSS.input}
            placeholder={locale.texts?.channelSearchPlaceholder}
            autofocus
          />
        </div>
      )}
    >
      <></>
    </TransitionDialog>
  )
}
