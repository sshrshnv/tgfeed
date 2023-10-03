import type { Component } from 'solid-js'
import { For, createSignal, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Button } from '~/shared/ui/elements/button'
import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

import type { Folder } from '../feed.types'

import * as feedMenuFoldersItemMenuCSS from './feed-menu-folders-item-menu.sss'

export type FeedMenuFoldersItemMenuProps = {
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

export const FeedMenuFoldersItemMenu: Component<FeedMenuFoldersItemMenuProps> = (props) => {
  const [isDeleting, setDeleting] = createSignal(false)

  const startDeleting = () => setDeleting(true)

  const getMenuItems = createMemo(() => [
    {
      icon: 'edit',
      text: localeState.texts?.feed.buttons.edit,
      onClick: props.onEdit
    },
    props.onMoveUp && {
      icon: 'arrowUpward',
      text: localeState.texts?.feed.buttons.moveUp,
      onClick: props.onMoveUp
    },
    props.onMoveDown && {
      icon: 'arrowDownward',
      text: localeState.texts?.feed.buttons.moveDown,
      onClick: props.onMoveDown
    },
    {
      icon: 'delete',
      text: isDeleting() ? localeState.texts?.feed.buttons.confirm : localeState.texts?.feed.buttons.delete,
      onClick: isDeleting() ? props.onDelete : startDeleting,
      warning: isDeleting()
    }
  ].filter(item => !!item) as FolderMenuItem[])

  return (
    <div class={feedMenuFoldersItemMenuCSS.base}>
      <For each={getMenuItems()}>{item => (
        <Button
          class={clsx(
            feedMenuFoldersItemMenuCSS.button,
            item.warning && feedMenuFoldersItemMenuCSS._warning
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
