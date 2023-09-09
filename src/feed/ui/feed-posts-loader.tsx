import type { Component } from 'solid-js'
import { Show, createEffect } from 'solid-js'
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
  createEffect(() => {
    if (props.active && !props.loading) {
      props.onScrollEnd()
    }
  })

  return (
    <div
      class={clsx(
        props.active && feedPostsLoaderCSS._active,
        feedPostsLoaderCSS.base,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
      style={{
        translate: `0 ${props.offset}px`
      }}
    >
      <Show when={props.loading}>
        <Icon
          class={animationsCSS.rotate}
          name='loader'
          size='large'
        />
      </Show>
    </div>
  )
}
