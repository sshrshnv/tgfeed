import type { Component } from 'solid-js'
import { Show, createMemo, createSignal, createEffect, untrack } from 'solid-js'
import { clsx } from 'clsx'

import { Paragraph } from '~/shared/ui/elements/paragraph'
import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import type { PostUuid } from '../feed.types'
import { FONT_SIZE_LINE_HEIGHT_VALUES, VISIBLE_LINES_COUNT } from '../feed.const'
import { feedState } from '../feed-state'
import { formatPostText } from '../utils/format-post-text'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsItemTextCSS from './feed-posts-item-text.sss'

export type FeedPostsItemTextProps = {
  class?: string
  uuid: PostUuid
  visible?: boolean
}

export const FeedPostsItemText: Component<FeedPostsItemTextProps> = (props) => {
  let paragraphEl!: HTMLParagraphElement
  const [isCollapsed, setCollapsed] = createSignal<boolean>()

  const getPost = createMemo(() =>
    feedState.posts[props.uuid]
  )

  const getText = createMemo(() =>
    formatPostText(getPost().message, getPost().entities)
  )

  const expand = () => {
    setCollapsed(false)
  }

  const resolve = () => {
    const maxHeight = FONT_SIZE_LINE_HEIGHT_VALUES[feedState.fontSize] * VISIBLE_LINES_COUNT
    setCollapsed(paragraphEl.scrollHeight > maxHeight)
  }

  createEffect((prev) => {
    const collapsed = untrack(isCollapsed)
    if (!prev && props.visible && typeof collapsed === 'undefined') {
      self.requestAnimationFrame(resolve)
    }
    return props.visible
  })

  return (
    <div class={clsx(
      props.class,
      feedPostsItemTextCSS.base
    )}>
      <Paragraph
        class={clsx(
          feedPostsItemTextCSS.text,
          isCollapsed() !== false && feedPostsItemTextCSS._collapsed
        )}
        size={feedState.fontSize}
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={getText()}
        ref={paragraphEl}
      />

      <Show when={isCollapsed() === true}>
        <Button
          class={clsx(
            feedPostsItemTextCSS.button,
            layoutCSS.after
          )}
          onClick={expand}
        >
          <Icon name='arrowDown' size='small'/>
        </Button>
      </Show>
    </div>
  )
}
