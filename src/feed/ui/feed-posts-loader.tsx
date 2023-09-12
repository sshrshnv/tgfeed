import type { Component } from 'solid-js'
import { createEffect, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements/icon'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedPostsLoaderCSS from './feed-posts-loader.sss'

export type FeedPostsLoaderProps = {
  offset?: number
  active?: boolean
  loading?: boolean
  onScrollEnd: () => void
}

export const FeedPostsLoader: Component<FeedPostsLoaderProps> = (props) => {
  const getStyles = createMemo(() => ({
    translate: `0 ${props.offset}px`
  }))

  createEffect(() => {
    if (props.active && !props.loading) {
      props.onScrollEnd()
    }
  })

  return (
    <div
      class={clsx(
        feedPostsLoaderCSS.base,
        !props.active && feedPostsLoaderCSS._transparent,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
      style={getStyles()}
    >
      <Icon
        class={clsx(
          !props.loading && feedPostsLoaderCSS._transparent,
          props.loading && animationsCSS.rotate
        )}
        name='loader'
        size='large'
      />
    </div>
  )
}
