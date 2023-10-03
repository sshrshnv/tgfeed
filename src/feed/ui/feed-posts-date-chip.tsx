import type { Component } from 'solid-js'
import { createSignal, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Text } from '~/shared/ui/elements/text'

import type { PostUuid } from '../feed.types'
import { getPost } from '../utils/get-cache-data'
import { formatPostsDate } from '../utils/format-posts-date'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsDateChipCSS from './feed-posts-date-chip.sss'

export type FeedPostsItemDateChipProps = {
  uuid: PostUuid
  offset?: number
  sticky?: boolean
}

export const FeedPostsDateChip: Component<FeedPostsItemDateChipProps> = (props) => {
  const [isReady, setReady] = createSignal(false)

  const getDate = () =>
    formatPostsDate(getPost(props.uuid).date, { lang: localeState.lang })

  const getStyles = () => ((props.sticky || typeof props.offset !== 'number') ? {} : {
    translate: `var(--local-forced-translate, 0 ${props.offset}px)`
  })

  createEffect((prevOffset) => {
    if (typeof prevOffset !== 'undefined') return
    self.setTimeout(() => setReady(true), 50)
    return props.offset
  })

  return (
    <div
      class={clsx(
        props.sticky && feedPostsDateChipCSS._sticky,
        !isReady() && feedPostsDateChipCSS._transparent,
        feedPostsDateChipCSS.base,
        layoutCSS.flex,
        layoutCSS.flexCenter,
        layoutCSS.before
      )}
      style={getStyles()}
    >
      <Text
        class={feedPostsDateChipCSS.label}
        variant='label'
        size='medium'
      >
        {getDate()}
      </Text>
    </div>
  )
}
