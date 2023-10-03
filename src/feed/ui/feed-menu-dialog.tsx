import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { routingState } from '~/shared/routing/routing-state'
import { pushRoute } from '~/shared/routing/actions/push-route'
import { Menu, TransitionMenu, MenuHeader, MenuTitle } from '~/shared/ui/elements/menu'
import { TransitionDialog } from '~/shared/ui/elements/dialog'
import { Text } from '~/shared/ui/elements/text'
import { Button } from '~/shared/ui/elements/button'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import { FeedDialogFolders } from './feed-menu-folders'
import { FeedFormDialog } from './feed-form-dialog'
import { FeedMenuFontSize } from './feed-menu-font-size'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedMenuDialogCSS from './feed-menu-dialog.sss'

export type FeedMenuDialogProps = {
  class?: string
}

export const FeedMenuDialog: Component<FeedMenuDialogProps> = (props) => {
  const [getEditingFolder, setEditingFolder] = createSignal<Folder>()
  const [isFormTranstioning, setFormTransitioning] = createSignal(false)
  const isOpen = () => routingState.currentDialogRoute?.id === feedRoutes.dialog.id
  const isFormOpen = () => routingState.currentRoute?.id === feedRoutes.formDialog.id

  const startFormTransitioning = () => setFormTransitioning(true)
  const endFormTransitioning = () => setFormTransitioning(false)

  const openNewFolderForm = () => {
    setEditingFolder()
    pushRoute(feedRoutes.formDialog)
  }

  const openEditingFolderForm = (folder, ev) => {
    ev.stopPropagation()
    setEditingFolder(folder)
    pushRoute(feedRoutes.formDialog)
  }

  return (
    <TransitionDialog
      class={clsx(
        props.class,
        feedMenuDialogCSS.base,
        layoutCSS.flex
      )}
      route={feedRoutes.dialog}
      open={isOpen()}
      animation='slideInLeftAnimation'
      onBeforeExit={startFormTransitioning}
    >
      <Menu
        class={clsx(
          feedMenuDialogCSS.menu,
          isFormOpen() && feedMenuDialogCSS._hidden
        )}
        {...(isFormOpen() ? { inert: true } : {})}
        scrollable
      >
        <MenuHeader
          title={localeState.texts?.feed.menuTitle}
        />

        <Button
          class={feedMenuDialogCSS.primaryButton}
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

        <FeedDialogFolders
          openEditingFolderForm={openEditingFolderForm}
        />

        <FeedMenuFontSize/>
      </Menu>

      <TransitionMenu
        class={feedMenuDialogCSS.formMenu}
        route={feedRoutes.formDialog}
        open={isFormOpen()}
        onAfterEnter={endFormTransitioning}
        onBeforeExit={startFormTransitioning}
      >
        <MenuHeader
          title={localeState.texts?.feed[`${!!getEditingFolder() ? 'edit' : 'new'}FolderTitle`]}
          backRoute={feedRoutes.formDialog}
        />
        <FeedFormDialog
          folder={getEditingFolder()}
          transitioning={isFormTranstioning()}
        />
      </TransitionMenu>
    </TransitionDialog>
  )
}
