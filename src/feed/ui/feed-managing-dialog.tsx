import type { Component } from 'solid-js'
import { createMemo, createSignal } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import { routingState, pushRoute } from '~/shared/routing'
import {
  Menu, TransitionMenu, MenuHeader, MenuTitle,
  TransitionDialog, Text, Button
} from '~/shared/ui/elements'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import { FeedManagingDialogFolders } from './feed-managing-dialog-folders'
import { FeedManagingDialogForm } from './feed-managing-dialog-form'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedManagingDialogCSS from './feed-managing-dialog.sss'

export type FeedManagingDialogProps = {
  class?: string
}

export const FeedManagingDialog: Component<FeedManagingDialogProps> = (props) => {
  const [getEditingFolder, setEditingFolder] = createSignal<Folder>()
  const [isFormTranstioning, setFormTransitioning] = createSignal(false)
  const isOpen = createMemo(() => routingState.currentDialogRoute?.id === feedRoutes.managingDialog.id)
  const isFormOpen = createMemo(() => routingState.currentRoute?.id === feedRoutes.managingDialogForm.id)

  const startFormTransitioning = () => setFormTransitioning(true)
  const endFormTransitioning = () => setFormTransitioning(false)

  const openNewFolderForm = () => {
    setEditingFolder()
    pushRoute(feedRoutes.managingDialogForm)
  }

  const openEditingFolderForm = (folder, ev) => {
    ev.stopPropagation()
    setEditingFolder(folder)
    pushRoute(feedRoutes.managingDialogForm)
  }

  return (
    <TransitionDialog
      class={clsx(
        props.class,
        feedManagingDialogCSS.base,
        layoutCSS.flex
      )}
      route={feedRoutes.managingDialog}
      open={isOpen()}
      animation='slideInLeftAnimation'
      onBeforeExit={startFormTransitioning}
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
          stopPropagation
        >
          <Text variant='label' size='large'>
            {localeState.texts?.feed.buttons.newFolder}
          </Text>
        </Button>

        <MenuTitle
          text={localeState.texts?.feed.foldersTitle}
        />

        <FeedManagingDialogFolders
          openEditingFolderForm={openEditingFolderForm}
        />
      </Menu>

      <TransitionMenu
        class={feedManagingDialogCSS.formMenu}
        route={feedRoutes.managingDialogForm}
        open={isFormOpen()}
        onAfterEnter={endFormTransitioning}
        onBeforeExit={startFormTransitioning}
      >
        <MenuHeader
          title={localeState.texts?.feed[`${!!getEditingFolder() ? 'edit' : 'new'}FolderTitle`]}
          backRoute={feedRoutes.managingDialogForm}
        />
        <FeedManagingDialogForm
          folder={getEditingFolder()}
          transitioning={isFormTranstioning()}
        />
      </TransitionMenu>
    </TransitionDialog>
  )
}
