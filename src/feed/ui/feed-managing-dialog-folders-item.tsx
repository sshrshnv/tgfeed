import type { Component,  } from 'solid-js'
import { Show, For, createSignal, createMemo, createEffect, batch } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import { routingState, pushRoute, popRoute } from '~/shared/routing'
import type { IconProps } from '~/shared/ui/elements'
import { Button, Icon, Text } from '~/shared/ui/elements'
import { getScaleInParams, getScaleOutParams } from '~/shared/ui/animations'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedManagingDialogFoldersItemCSS from './feed-managing-dialog-folders-item.sss'

export type FeedManagingDialogFoldersItemProps = {
  folder: Folder
  movable?: boolean
  onEdit: FolderActionHandler
  onMoveUp?: FolderIndexActionHandler
  onMoveDown?: FolderIndexActionHandler
  onDelete?: FolderActionHandler
  onConfirm?: FolderActionHandler
}

type FolderActionHandler = [
  (folder: Folder, ev) => void,
  Folder
]

type FolderIndex = {
  index: number
  k: number
}

type FolderIndexActionHandler = [
  (folderIndex: FolderIndex, ev) => void,
  FolderIndex
]

type FolderMenuItem = {
  icon: IconProps['name']
  text?: string
  warning?: boolean
  onClick?: () => void
}

const ANIMATION_PARAMS = {
  enter: getScaleInParams({ scale: '1 0' }),
  exit: getScaleOutParams({ scale: '1 0' })
}

export const FeedManagingDialogFoldersItem: Component<FeedManagingDialogFoldersItemProps> = (props) => {
  const [isExpanded, setExpanded] = createSignal(false)
  const [isDeleting, setDeleting] = createSignal(false)

  const isFolderMenuRoute = createMemo(() => {
    return routingState.currentRoute.id === feedRoutes.managingDialogFolderMenu.id
  })

  const openFolderMenu = () => {
    pushRoute(feedRoutes.managingDialogFolderMenu)
    setExpanded(true)
  }

  const closeFolderMenu = () => {
    popRoute(feedRoutes.managingDialogFolderMenu)
    batch(() => {
      setExpanded(false)
      setDeleting(false)
    })
  }

  const toggleExpanding = () => {
    isExpanded() ? closeFolderMenu() : openFolderMenu()
  }

  const toggleDeleting = () => setDeleting(true)

  createEffect(() => {
    if (!isFolderMenuRoute() && isExpanded()) {
      closeFolderMenu()
    }
  })

  const getMenuItems = createMemo<FolderMenuItem[]>(() => [
    { icon: 'edit', text: localeState.texts?.feed.buttons.edit, onClick: props.onEdit },
    props.onMoveUp && { icon: 'arrowUpward', text: localeState.texts?.feed.buttons.moveUp, onClick: props.onMoveUp },
    props.onMoveDown && { icon: 'arrowDownward', text: localeState.texts?.feed.buttons.moveDown, onClick: props.onMoveDown },
    !isDeleting() && { icon: 'delete', text: localeState.texts?.feed.buttons.delete, onClick: toggleDeleting },
    isDeleting() && { icon: 'delete', text: localeState.texts?.feed.buttons.confirm, onClick: props.onDelete, warning: true },
  ].filter(item => !!item) as FolderMenuItem[])

  const handleEnter: TransitionProps['onEnter'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.enter
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  const handleExit: TransitionProps['onExit'] = async (el, done) => {
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
        onEnter={handleEnter}
        onExit={handleExit}
      >
        <Show when={isExpanded()}>
          <div class={feedManagingDialogFoldersItemCSS.menu}>
            <For each={getMenuItems()}>{item => (
              <Button
                class={clsx(
                  feedManagingDialogFoldersItemCSS.button,
                  item.warning && feedManagingDialogFoldersItemCSS._warning
                )}
                onClick={item.onClick}
                stopPropagation
              >
                <Icon name={item.icon} size='small'/>
                <Text variant='label' size='large' ellipsis>
                  {item.text}
                </Text>
              </Button>
            )}</For>
          </div>
        </Show>
      </Transition>
    </div>
  )
}
