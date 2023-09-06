import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { accountState } from '~/core/account/account-state'
import { AccountMenu } from '~/core/account/ui/account-menu'
import { localeState } from '~/core/locale/locale-state'
import { LocaleMenu } from '~/core/locale/ui/locale-menu'
import { ThemeMenu } from '~/core/theme/ui/theme-menu'
import { feedRoutes } from '~/feed/feed-routes'
import { routingState } from '~/shared/routing/routing-state'
import { Menu, MenuHeader, MenuRouteButton, MenuFooter } from '~/shared/ui/elements/menu'
import { TransitionDialog } from '~/shared/ui/elements/dialog'
import { Text } from '~/shared/ui/elements/text'

import { coreRoutes } from '../core-routes'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as coreMenuDialogCSS from './core-menu-dialog.sss'

export type CoreMenuDialogProps = {
  class?: string
}

export const CoreMenuDialog: Component<CoreMenuDialogProps> = (props) => {
  const isOpen = () => routingState.currentDialogRoute?.id === coreRoutes.menuDialog.id

  return (
    <TransitionDialog
      class={clsx(
        props.class,
        coreMenuDialogCSS.base,
        layoutCSS.flex
      )}
      route={coreRoutes.menuDialog}
      open={isOpen()}
      animation='slideInRightAnimation'
    >
      <Menu scrollable>
        <MenuHeader
          title={process.env.APP_TITLE}
        />

        <Show when={accountState.authorized}>
          <MenuRouteButton
            route={feedRoutes.page}
            text={localeState.texts?.feed.routeTitle}
            variant='primary'
            icon='feed'
          />
        </Show>

        <AccountMenu/>
        <ThemeMenu/>
        <LocaleMenu/>

        <MenuFooter>
          <Text variant='label' size='small'>
            Help
          </Text>
          <Text variant='label' size='small'>
            v{process.env.APP_VERSION}
          </Text>
        </MenuFooter>
      </Menu>
    </TransitionDialog>
  )
}
