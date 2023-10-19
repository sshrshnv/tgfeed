import type { Component } from 'solid-js'
import { createSignal, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { generatePostUrl } from '~/shared/api/utils/generate-post-url'
import { routingState } from '~/shared/routing/routing-state'
import { popRoute } from '~/shared/routing/actions/pop-route'
import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

import type { PostUuid } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import { savePost } from '../actions/save-post'
import { getPost, getPostChannel } from '../utils/get-cache-data'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as feedPostsItemMenuCSS from './feed-posts-item-menu.sss'

export type FeedPostsItemMenuProps = {
  uuid: PostUuid
  chipPadding?: boolean
  onClose?: () => void
}

export const FeedPostsItemMenu: Component<FeedPostsItemMenuProps> = (props) => {
  const [isSaving, setSaving] = createSignal(false)

  const getPostUrl = () =>
    generatePostUrl(getPost(props.uuid).id, getPostChannel(props.uuid))

  const save = async () => {
    setSaving(true)
    await savePost(getPost(props.uuid).id, getPostChannel(props.uuid))
    props.onClose?.()
  }

  onCleanup(() => {
    const folderMenuRoute = routingState.history.findLast(route =>
      route.id === feedRoutes.postMenu.id
    )
    if (!folderMenuRoute) return
    popRoute(feedRoutes.postMenu)
  })

  return (
    <div
      class={clsx(
        feedPostsItemMenuCSS.base,
        props.chipPadding && feedPostsItemMenuCSS._chipPadding,
        layoutCSS.before
      )}
    >
      <Button
        class={feedPostsItemMenuCSS.button}
        onClick={save}
        stopImmediatePropagation
      >
        <Icon name='bookmark' size='medium'/>
        <Text variant='label' size='large'>
          {isSaving() ? localeState.texts?.feed.buttons.saving : localeState.texts?.feed.buttons.savePost}
        </Text>
      </Button>

      <a
        class={clsx(
          feedPostsItemMenuCSS.button,
          layoutCSS.flex,
          layoutCSS.outline
        )}
        href={getPostUrl()}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Icon name='arrowOutward' size='medium'/>
        <Text variant='label' size='large'>
          {localeState.texts?.feed.buttons.openTelegram}
        </Text>
      </a>
    </div>
  )
}
