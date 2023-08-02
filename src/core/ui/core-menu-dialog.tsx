import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { accountState } from '~/core/account'
import { AccountMenu } from '~/core/account/ui'
import { localeState } from '~/core/locale'
import { LocaleMenu } from '~/core/locale/ui'
import { ThemeMenu } from '~/core/theme/ui'
import { feedRoutes } from '~/feed'
import { routingState } from '~/shared/routing'
import {
  Menu, MenuHeader, MenuRouteButton, MenuFooter,
  TransitionDialog, Text
} from '~/shared/ui/elements'

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
