import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { authRoutes } from '~/auth/auth-routes'
import { MenuTitle, MenuRouteButton, MenuButton } from '~/shared/ui/elements/menu'

import { logOut } from '../actions/log-out'
import { accountState } from '../account-state'

export const AccountMenu: Component = () => {
  return (
    <>
      <Switch>
        <Match when={accountState.authorized}>
          <MenuTitle
            text={localeState.texts?.account.title}
          />
          <MenuButton
            text={localeState.texts?.account.signOut}
            icon='logout'
            onClick={logOut}
          />
        </Match>
        <Match when={!accountState.authorized}>
          <MenuRouteButton
            route={authRoutes.page}
            text={localeState.texts?.account.signIn}
            variant='primary'
            icon='account'
          />
        </Match>
      </Switch>
    </>
  )
}
