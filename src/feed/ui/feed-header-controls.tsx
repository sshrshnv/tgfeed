import type { Component } from 'solid-js'

import { FeedChannelSearch } from './feed-channel-search'
import { FeedOffsetSelect } from './feed-offset-select'

export const FeedHeaderControls: Component = () => {
  return (
    <>
      <FeedChannelSearch/>
      <FeedOffsetSelect/>
    </>
  )
}
