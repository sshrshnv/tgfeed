import type { Component } from 'solid-js'
import { Show, createSignal, createEffect, createMemo, onMount, onCleanup } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import { routingState } from '~/shared/routing/routing-state'
import { pushRoute } from '~/shared/routing/actions/push-route'
import { getScaleInParams, getScaleOutParams } from '~/shared/ui/animations'
import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import type { UncertainPostUuid, PostUuid, PostGroupUuid } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import { getPost } from '../utils/get-feed-cache-data'
import { isSupportedMedia } from '../utils/detect-post-media'
import { FeedPostsItemHeader } from './feed-posts-item-header'
import { FeedPostsItemMedia } from './feed-posts-item-media'
import { FeedPostsItemText } from './feed-posts-item-text'
import { FeedPostsItemMenu } from './feed-posts-item-menu'

import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  refId: UncertainPostUuid
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  offset: number
  chipPadding?: boolean
  visible?: boolean
  onScreen?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

const ANIMATION_PARAMS = {
  enter: getScaleInParams({ scale: '1 0' }),
  exit: getScaleOutParams({ scale: '1 0' })
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement
  const [isReady, setReady] = createSignal(false)
  const [isMenuExpanded, setMenuExpanded] = createSignal(false)

  const isPostMenuRoute = () =>
    routingState.currentRoute.id === feedRoutes.managingDialogFolderMenu.id

  const getStyles = createMemo(() => ({
    translate: `0 ${props.offset}px`
  }))

  const openMenu = () => {
    pushRoute(feedRoutes.managingDialogFolderMenu)
    setMenuExpanded(true)
  }

  const closeMenu = () =>
    setMenuExpanded(false)

  const hasText = () =>
    !!getPost(props.uuid).message.length

  const hasMedia = () =>
    !!props.groupUuid || isSupportedMedia(getPost(props.uuid).media)

  const handleMenuEnter: TransitionProps['onEnter'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.enter
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  const handleMenuExit: TransitionProps['onExit'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.exit
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  createEffect(() => {
    if (!isPostMenuRoute() && isMenuExpanded()) {
      closeMenu()
    }
  })

  createEffect(() => {
    if (isMenuExpanded()) {
      self.document.addEventListener('click', closeMenu)
    }
    onCleanup(() => {
      self.document.removeEventListener('click', closeMenu)
    })
  })

  createEffect((prevOffset) => {
    if (typeof prevOffset !== 'undefined') return
    self.setTimeout(() => setReady(true), 50)
    return props.offset
  })

  onMount(() => {
    props.onMount?.(el)
  })

  onCleanup(() => {
    props.onCleanup?.(el)
  })

  return (
    <div
      class={clsx(
        feedPostsItemCSS.wrapper,
        !props.visible && feedPostsItemCSS._hidden,
        !isReady() && feedPostsItemCSS._transparent
      )}
      style={getStyles()}
      id={props.refId}
      ref={el}
    >
      <div class={clsx(
        feedPostsItemCSS.padding,
        props.chipPadding && feedPostsItemCSS._chipPadding
      )}/>

      <article
        class={feedPostsItemCSS.base}
        {...(isMenuExpanded() ? { inert: true } : {})}
      >
        <FeedPostsItemHeader
          uuid={props.uuid}
          visible={props.visible && isReady()}
        >
          <Button
            class={feedPostsItemCSS.menuButton}
            onClick={openMenu}
          >
            <Icon name='more' size='medium'/>
          </Button>
        </FeedPostsItemHeader>

        <Show when={hasMedia()}>
          <FeedPostsItemMedia
            uuid={props.uuid}
            groupUuid={props.groupUuid}
            visible={props.visible && isReady()}
            onScreen={props.onScreen && isReady()}
          />
        </Show>

        <Show when={hasText()}>
          <FeedPostsItemText
            uuid={props.uuid}
            visible={props.visible}
          />
        </Show>
      </article>

      <Transition
        onEnter={handleMenuEnter}
        onExit={handleMenuExit}
      >
        <Show when={isMenuExpanded()}>
          <FeedPostsItemMenu
            uuid={props.uuid}
            chipPadding={props.chipPadding}
            onClose={closeMenu}
          />
        </Show>
      </Transition>
    </div>
  )
}
