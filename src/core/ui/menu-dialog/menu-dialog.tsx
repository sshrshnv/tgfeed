import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'
import { clsx } from 'clsx'

import { routes } from '~/core/routes'
import { account } from '~/core/account'
import { AccountMenu } from '~/core/account/ui'
import { locale } from '~/core/locale'
import { LocaleMenu } from '~/core/locale/ui'
import { ThemeMenu } from '~/core/theme/ui'
import { routing } from '~/shared/routing'
import {
  TransitionDialog,
  Menu, MenuTitle, MenuButton, MenuFooter,
  Text, layoutCSS
} from '~/shared/ui/elements'

import * as menuDialogCSS from './menu-dialog.sss'

export const MenuDialog: Component = () => {
  const isOpen = () => routing.currentDialogRoute?.id === routes.menu.id

  return (
    <TransitionDialog
      class={clsx(
        menuDialogCSS.base,
        layoutCSS.flex
      )}
      route={routes.menu}
      open={isOpen()}
      animation='slideInRightAnimation'
    >
      <Menu>
        <Switch>
          <Match when={account.authorized}>
            <MenuTitle
              text={locale.texts?.channels}
            />
            <MenuButton
              route={routes.feedChannels}
              text={locale.texts?.configureChannels}
              icon='edit'
            />

            <MenuTitle
              text={locale.texts?.messages}
            />
            <MenuButton
              route={routes.feedFilters}
              text={locale.texts?.configureFilters}
              icon='filter'
            />

            <AccountMenu/>
          </Match>

          <Match when={!account.authorized}>
            <AccountMenu/>
          </Match>
        </Switch>

        <ThemeMenu/>
        <LocaleMenu/>
      </Menu>

      <MenuFooter>
        <Text variant='label' size='small'>
          {process.env.APP_TITLE}
        </Text>
        <Text variant='label' size='small'>
          v{process.env.APP_VERSION}
        </Text>
      </MenuFooter>
    </TransitionDialog>
  )
}
