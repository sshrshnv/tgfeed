import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { accountState } from '~/core/account'
import { AccountMenu } from '~/core/account/ui'
import { localeState } from '~/core/locale'
import { LocaleMenu } from '~/core/locale/ui'
import { ThemeMenu } from '~/core/theme/ui'
import { feedRoutes } from '~/feed'
import { routing } from '~/shared/routing'
import {
  TransitionDialog, Text,
  Menu, MenuTitle, MenuRouteButton, MenuFooter
} from '~/shared/ui/elements'

import { coreRoutes } from '../../core.routes'
import * as layoutCSS from '../../../shared/ui/elements/layout.sss'
import * as coreMenuDialogCSS from './core-menu-dialog.sss'

export type CoreMenuDialogProps = {
  class?: string
}

export const CoreMenuDialog: Component<CoreMenuDialogProps> = (props) => {
  const isOpen = () => routing.currentDialogRoute?.id === coreRoutes.menuDialog.id

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
      <Menu>
        <MenuTitle
          class={coreMenuDialogCSS.title}
          text={process.env.APP_TITLE}
        />

        <Show when={accountState.authorized}>
          <MenuRouteButton
            route={feedRoutes.channelsPage}
            text={localeState.texts?.configureChannels}
            variant='primary'
            icon='channels'
          />
          <MenuRouteButton
            route={feedRoutes.filtersPage}
            text={localeState.texts?.configureFilters}
            variant='tertiary'
            icon='visibilityOff'
          />
        </Show>

        <AccountMenu/>
        <ThemeMenu/>
        <LocaleMenu/>
      </Menu>

      <MenuFooter>
        <Text variant='label' size='small'>
          Privacy
        </Text>
        <Text variant='label' size='small'>
          v{process.env.APP_VERSION}
        </Text>
      </MenuFooter>
    </TransitionDialog>
  )
}
