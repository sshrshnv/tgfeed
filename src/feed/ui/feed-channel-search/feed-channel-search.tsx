import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { routes } from '~/core/routes'
import { Button, Icon, Text } from '~/shared/ui/elements'

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
        route={routes.feedChannelSearch}
      >
        {locale.texts?.channelSearch}
      </Button>

      <FeedChannelSearchDialog/>
    </div>
  )
}
