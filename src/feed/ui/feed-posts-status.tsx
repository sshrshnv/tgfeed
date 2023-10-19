import type { Component } from 'solid-js'
import { Show, createEffect, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Text } from '~/shared/ui/elements/text'
import { Icon } from '~/shared/ui/elements/icon'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as animationsCSS from '~/shared/ui/animations/animations.sss'
import * as feedPostsStatusCSS from './feed-posts-status.sss'

export type FeedPostsStatusProps = {
  offset?: number
  active?: boolean
  loading?: boolean
  empty?: boolean
  end?: boolean
  onScrollEnd: () => void
}

export const FeedPostsStatus: Component<FeedPostsStatusProps> = (props) => {
  const getText = createMemo(() =>
    props.loading ? '' :
    props.empty ? localeState.texts?.feed.emptyFeed :
    props.end ? localeState.texts?.feed.endOfFeed :
    ''
  )

  const getStyles = createMemo(() => ({
    translate: `0 ${props.offset === 0 ? 'var(--js-local-min-top-offset)' : `${props.offset}px`}`
  }))

  createEffect(() => {
    if (props.active && !props.loading) {
      props.onScrollEnd()
    }
  })

  return (
    <div
      class={clsx(
        feedPostsStatusCSS.base,
        !props.active && feedPostsStatusCSS._transparent,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
      style={getStyles()}
    >
      <Show when={!getText()}>
        <Icon
          class={clsx(
            !props.loading && feedPostsStatusCSS._transparent,
            props.loading && animationsCSS.rotate
          )}
          name='loader'
          size='large'
        />
      </Show>

      <Show when={getText()}>
        <Text variant='label' size='medium'>
          {getText()}
        </Text>
      </Show>
    </div>
  )
}
