import type { Component,  } from 'solid-js'
import { Show, splitProps, createSignal, createMemo, createEffect } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import { routingState, pushRoute } from '~/shared/routing'
import { Button, Icon, Text } from '~/shared/ui/elements'
import { getScaleInParams, getScaleOutParams } from '~/shared/ui/animations'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import type { FeedManagingDialogFoldersItemMenuProps } from './feed-managing-dialog-folders-item-menu'
import { FeedManagingDialogFoldersItemMenu } from './feed-managing-dialog-folders-item-menu'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedManagingDialogFoldersItemCSS from './feed-managing-dialog-folders-item.sss'

export type FeedManagingDialogFoldersItemProps = FeedManagingDialogFoldersItemMenuProps & {
  folder: Folder
}

const ANIMATION_PARAMS = {
  enter: getScaleInParams({ scale: '1 0' }),
  exit: getScaleOutParams({ scale: '1 0' })
}

export const FeedManagingDialogFoldersItem: Component<FeedManagingDialogFoldersItemProps> = (_props) => {
  const [props, menuProps] = splitProps(_props, ['folder'])

  const [isExpanded, setExpanded] = createSignal(false)

  const isFolderMenuRoute = createMemo(() => {
    return routingState.currentRoute.id === feedRoutes.managingDialogFolderMenu.id
  })

  const openFolderMenu = () => {
    pushRoute(feedRoutes.managingDialogFolderMenu)
    setExpanded(true)
  }

  const closeFolderMenu = () => {
    setExpanded(false)
  }

  const toggleExpanding = () => {
    isExpanded() ? closeFolderMenu() : openFolderMenu()
  }

  createEffect(() => {
    if (!isFolderMenuRoute() && isExpanded()) {
      closeFolderMenu()
    }
  })

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

  return (
    <div>
      <Button
        class={clsx(
          feedManagingDialogFoldersItemCSS.button,
          isExpanded() && feedManagingDialogFoldersItemCSS._expanded,
          layoutCSS.after
        )}
        onClick={toggleExpanding}
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
        <Show when={isExpanded()}>
          <FeedManagingDialogFoldersItemMenu
            {...menuProps}
          />
        </Show>
      </Transition>
    </div>
  )
}