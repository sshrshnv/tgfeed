import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Text } from '~/shared/ui/elements/text'

import type { PostUuid } from '../feed.types'
import { getPost } from '../utils/get-feed-cache-data'
import { formatPostsDate } from '../utils/format-posts-date'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsDateCSS from './feed-posts-date.sss'

export type FeedPostsItemDateProps = {
  uuid: PostUuid
  offset?: number
  sticky?: boolean
}

const FEED_POSTS_DATE_OFFSET = 68

export const FeedPostsDate: Component<FeedPostsItemDateProps> = (props) => {
  const getDate = () =>
    formatPostsDate(getPost(props.uuid).date, { lang: localeState.lang })

  const getStyles = () => ((props.sticky || typeof props.offset !== 'number') ? {} : {
    translate: `0 ${props.offset - FEED_POSTS_DATE_OFFSET}px`
  })

  return (
    <div
      class={clsx(
        props.sticky && feedPostsDateCSS._sticky,
        feedPostsDateCSS.base,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
      style={getStyles()}
    >
      <Text variant='label' size='medium'>
        {getDate()}
      </Text>
    </div>
  )
}
