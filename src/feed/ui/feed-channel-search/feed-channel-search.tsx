import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { feedRoutes } from '~/feed'
import { Button, Icon } from '~/shared/ui/elements'

import { FeedChannelSearchDialog } from './feed-channel-search-dialog'
import * as feedChannelSearchCSS from './feed-channel-search.sss'

export const FeedChannelSearch: Component = () => {
  return (
    <div class={feedChannelSearchCSS.base}>
      <Icon
        class={feedChannelSearchCSS.icon}
        name='search'
        size='large'
      />
      <Button
        class={feedChannelSearchCSS.button}
        route={feedRoutes.channelSearchPopover}
      >
        {locale.texts?.channelSearch}
      </Button>

      <FeedChannelSearchDialog/>
    </div>
  )
}
