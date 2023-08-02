import type { Component } from 'solid-js'
import { createMemo, createSignal } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import { routingState, pushRoute } from '~/shared/routing'
import {
  Menu, MenuHeader, MenuTitle,
  TransitionDialog, Text, Button, Checkbox
} from '~/shared/ui/elements'

import type { Folder } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'
import { feedRoutes } from '../feed-routes'
import { FeedManagingDialogForm } from './feed-managing-dialog-form'
import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedManagingDialogCSS from './feed-managing-dialog.sss'

export type FeedManagingDialogProps = {
  class?: string
}

export const FeedManagingDialog: Component<FeedManagingDialogProps> = (props) => {
  const [getEditingFolder, setEditingFolder] = createSignal<Folder>()
  const isOpen = createMemo(() => routingState.currentDialogRoute?.id === feedRoutes.channelsMenuDialog.id)
  const isFormOpen = createMemo(() => routingState.currentRoute?.id === feedRoutes.channelsFolderForm.id)
  const hasFolders = createMemo(() => !!feedState.folders.length)

  const toggleDefaultFolder = () => {
    setFeedState(state => ({ defaultFolder: !state.defaultFolder }))
  }

  const openNewFolderForm = (ev) => {
    ev.stopPropagation()
    pushRoute(feedRoutes.channelsFolderForm)
  }

  const openEditingFolderForm = (ev) => {
    ev.stopPropagation()
    pushRoute(feedRoutes.channelsFolderForm)
  }

  return (
    <TransitionDialog
      class={clsx(
        props.class,
        feedManagingDialogCSS.base,
        layoutCSS.flex
      )}
      route={feedRoutes.channelsMenuDialog}
      open={isOpen()}
      animation='slideInLeftAnimation'
    >
      <Menu
        class={clsx(
          feedManagingDialogCSS.menu,
          isFormOpen() && feedManagingDialogCSS._hidden
        )}
        {...(isFormOpen() ? { inert: true } : {})}
        scrollable
      >
        <MenuHeader
          title={localeState.texts?.feed.menuTitle}
        />

        <Button
          class={feedManagingDialogCSS.primaryButton}
          onClick={openNewFolderForm}
        >
          <Text variant='label' size='large'>
            {localeState.texts?.feed.buttons.newFolder}
          </Text>
        </Button>

        <MenuTitle
          text={localeState.texts?.feed.foldersTitle}
        />

        <Checkbox
          class={feedManagingDialogCSS.checkbox}
          text={localeState.texts?.feed.defaultFolder}
          icon={`visibility${hasFolders() ? (feedState.defaultFolder ? 'On' : 'Off') : 'Lock'}`}
          checked={!hasFolders() || feedState.defaultFolder}
          disabled={!hasFolders()}
          onChange={toggleDefaultFolder}
        />
      </Menu>

      <FeedManagingDialogForm
        folder={getEditingFolder()}
        open={isFormOpen()}
      />
    </TransitionDialog>
  )
}
