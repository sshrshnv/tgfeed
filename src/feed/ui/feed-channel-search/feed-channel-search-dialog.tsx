import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { locale } from '~/core/locale'
import { routes } from '~/core/routes'
import { routing } from '~/shared/routing'
import { TransitionDialog, Input, Icon } from '~/shared/ui/elements'
import { slideInBottomAnimation, slideOutTopAnimation } from '~/shared/ui/animations'
import { animationsCSS } from '~/shared/ui/animations'

import * as feedChannelSearchCSS from './feed-channel-search.sss'
import * as feedChannelSearchDialogCSS from './feed-channel-search-dialog.sss'

export type FeedChannelSearchDialogProps = {
  open?: boolean
}

export const FeedChannelSearchDialog: Component<FeedChannelSearchDialogProps> = () => {
  const isOpen = createMemo(() =>
    routing.currentRoute?.id === routes.feedChannelSearch.id
  )

  return (
    <TransitionDialog
      class={feedChannelSearchDialogCSS.popover}
      wrapperClass={feedChannelSearchDialogCSS.wrapper}
      route={routes.feedChannelSearch}
      open={isOpen()}
      inAnimation={slideInBottomAnimation}
      outAnimation={slideOutTopAnimation}
      staticChildren={(
        <div class={clsx(
          feedChannelSearchCSS.base,
          feedChannelSearchDialogCSS.staticBase,
          isOpen() ? animationsCSS.fadeInAnimation : animationsCSS.fadeOutAnimation,
          animationsCSS.performance,
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
