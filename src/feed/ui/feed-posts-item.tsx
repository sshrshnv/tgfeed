import type { Component } from 'solid-js'
import { Show, createMemo, onMount, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import { Button, Icon, Text, Paragraph } from '~/shared/ui/elements'

import type { PostData } from '../feed.types'
import { feedState } from '../feed-state'
import { formatDate, formatPostText } from '../utils'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  uuid: PostData['uuid']
  offset: number
  hidden?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement

  const getPost = createMemo(() =>
    feedState.posts[props.uuid]
  )
  const getPostDate = createMemo(() =>
    formatDate(getPost().date, { time: true })
  )
  const getPostText = createMemo(() =>
    formatPostText(getPost().message, getPost().entities)
  )

  const getChannelTitle = createMemo(() =>
    feedState.channels[getPost().peer_id.channel_id].title
  )

  onMount(() => props.onMount?.(el))
  onCleanup(() => props.onCleanup?.(el))

  return (
    <div
      class={feedPostsItemCSS.wrapper}
      style={{
        top: `${props.offset}px`,
        opacity: typeof props.offset === 'undefined' ? 0 : 1,
        display: props.hidden ? 'none' : 'block'
      }}
      id={props.uuid}
      ref={el}
    >
      <article class={feedPostsItemCSS.base}>
        <header class={clsx(
          feedPostsItemCSS.header,
          layoutCSS.flex
        )}>
          <FeedChannelCover
            channelId={getPost().peer_id.channel_id}
            size='medium'
            visible={!props.hidden}
          />

          <div class={clsx(
            feedPostsItemCSS.description,
            layoutCSS.flex
          )}>
            <Text variant='label' size='medium' ellipsis>
              {getChannelTitle()}
            </Text>
            <Text variant='label' size='small'>
              {getPostDate()}
            </Text>
          </div>

          <Button
            class={feedPostsItemCSS.button}
          >
            <Icon name='more' size='medium'/>
          </Button>
        </header>

        <Show when={getPostText().length}>
          <Paragraph
            class={feedPostsItemCSS.text}
            size='medium'
            // eslint-disable-next-line solid/no-innerhtml
            innerHTML={getPostText()}
          />
        </Show>
      </article>
    </div>
  )
}
