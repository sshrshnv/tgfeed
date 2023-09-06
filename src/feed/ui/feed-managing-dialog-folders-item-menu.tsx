import type { Component } from 'solid-js'
import { For, createSignal, createMemo, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { routingState } from '~/shared/routing/routing-state'
import { popRoute } from '~/shared/routing/actions/pop-route'
import { Button } from '~/shared/ui/elements/button'
import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'

import * as feedManagingDialogFoldersItemMenuCSS from './feed-managing-dialog-folders-item-menu.sss'

export type FeedManagingDialogFoldersItemMenuProps = {
  onEdit: FolderActionHandler
  onMoveUp?: FolderIndexActionHandler
  onMoveDown?: FolderIndexActionHandler
  onDelete?: FolderActionHandler
  onConfirm?: FolderActionHandler
}

type FolderMenuItem = {
  icon: IconProps['name']
  text?: string
  warning?: boolean
  onClick?: () => void
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

export const FeedManagingDialogFoldersItemMenu: Component<FeedManagingDialogFoldersItemMenuProps> = (props) => {
  const [isDeleting, setDeleting] = createSignal(false)

  const startDeleting = () => setDeleting(true)

  const getMenuItems = createMemo<FolderMenuItem[]>(() => [
    { icon: 'edit', text: localeState.texts?.feed.buttons.edit, onClick: props.onEdit },
    props.onMoveUp && { icon: 'arrowUpward', text: localeState.texts?.feed.buttons.moveUp, onClick: props.onMoveUp },
    props.onMoveDown && { icon: 'arrowDownward', text: localeState.texts?.feed.buttons.moveDown, onClick: props.onMoveDown },
    !isDeleting() && { icon: 'delete', text: localeState.texts?.feed.buttons.delete, onClick: startDeleting },
    isDeleting() && { icon: 'delete', text: localeState.texts?.feed.buttons.confirm, onClick: props.onDelete, warning: true },
  ].filter(item => !!item) as FolderMenuItem[])

  onCleanup(() => {
    const folderMenuRoute = routingState.history.findLast(route =>
      route.id === feedRoutes.managingDialogFolderMenu.id
    )
    if (!folderMenuRoute) return
    popRoute(feedRoutes.managingDialogFolderMenu)
  })

  return (
    <div class={feedManagingDialogFoldersItemMenuCSS.base}>
      <For each={getMenuItems()}>{item => (
        <Button
          class={clsx(
            feedManagingDialogFoldersItemMenuCSS.button,
            item.warning && feedManagingDialogFoldersItemMenuCSS._warning
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
  )
}
