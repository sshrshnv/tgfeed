import type { Component,  } from 'solid-js'
import { Show, splitProps, createSignal, createEffect } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import { routingState } from '~/shared/routing/routing-state'
import { pushRoute } from '~/shared/routing/actions/push-route'
import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'
import { getScaleInParams, getScaleOutParams } from '~/shared/ui/animations'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import type { FeedMenuFoldersItemMenuProps } from './feed-menu-folders-item-menu'
import { FeedMenuFoldersItemMenu } from './feed-menu-folders-item-menu'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as feedMenuFoldersItemCSS from './feed-menu-folders-item.sss'

export type FeedMenuFoldersItemProps = FeedMenuFoldersItemMenuProps & {
  folder: Folder
}

const ANIMATION_PARAMS = {
  enter: getScaleInParams({ scale: '1, 0' }),
  exit: getScaleOutParams({ scale: '1, 0' })
}

export const FeedMenuFoldersItem: Component<FeedMenuFoldersItemProps> = (_props) => {
  const [props, menuProps] = splitProps(_props, ['folder'])
  const [isMenuExpanded, setMenuExpanded] = createSignal(false)

  const isFolderMenuRoute = () =>
    routingState.currentRoute.id === feedRoutes.dialogFolderMenu.id

  const openMenu = () => {
    pushRoute(feedRoutes.dialogFolderMenu)
    setMenuExpanded(true)
  }

  const closeMenu = () =>
    setMenuExpanded(false)

  const toggleMenuExpanding = () =>
    isMenuExpanded() ? closeMenu() : openMenu()

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
    if (!isFolderMenuRoute() && isMenuExpanded()) {
      closeMenu()
    }
  })

  return (
    <div>
      <Button
        class={clsx(
          feedMenuFoldersItemCSS.button,
          isMenuExpanded() && feedMenuFoldersItemCSS._expanded,
          layoutCSS.after
        )}
        onClick={toggleMenuExpanding}
        stopPropagation
      >
        <Icon name='folder' size='medium'/>
        <Text variant='label' size='large' ellipsis>
          {props.folder.name}
        </Text>
        <Icon name='arrowDown' size='medium'/>
      </Button>

      <Transition
        onEnter={handleMenuEnter}
        onExit={handleMenuExit}
      >
        <Show when={isMenuExpanded()}>
          <FeedMenuFoldersItemMenu
            {...menuProps}
          />
        </Show>
      </Transition>
    </div>
  )
}
