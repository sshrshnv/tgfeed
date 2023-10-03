import type { ParentComponent } from 'solid-js'
import { createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { ButtonProps } from '~/shared/ui/elements/button'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { selectFolder } from '../actions/select-folder'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedTabsItemCSS from './feed-tabs-item.sss'

export type FeedTabsItemProps = ButtonProps & {
  folderId: Folder['id']
}

export const FeedTabsItem: ParentComponent<FeedTabsItemProps> = (props) => {
  let tabEl!: HTMLButtonElement

  const isActive = () =>
    feedState.currentFolderId === props.folderId

  const handleClick = () =>
    selectFolder(props.folderId)

  createEffect((prev) => {
    const active = isActive()
    if (!prev && active) {
      tabEl?.scrollIntoView({ inline: 'center' })
    }
    return active
  })

  return (
    <Button
      class={clsx(
        feedTabsItemCSS.base,
        isActive() && feedTabsItemCSS._active,
        layoutCSS.before,
        layoutCSS.after
      )}
      ref={tabEl}
      role="tab"
      opacity={false}
      onClick={handleClick}
    >
      <Text variant='label' size='large'>
        {props.children}
      </Text>
    </Button>
  )
}
