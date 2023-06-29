import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'

import { locale } from '~/core/locale'
import { authRoutes } from '~/auth'
import { MenuTitle, MenuRouteButton, MenuButton } from '~/shared/ui/elements'

import { account } from '../../account.state'

export const AccountMenu: Component = () => {
  return (
    <>
      <Switch>
        <Match when={account.authorized}>
          <MenuTitle
            text={locale.texts?.account.title}
          />
          <MenuButton
            text={locale.texts?.account.signOut}
            icon='logout'
          />
        </Match>
        <Match when={!account.authorized}>
          <MenuRouteButton
            route={authRoutes.page}
            text={locale.texts?.account.signIn}
            variant='primary'
            icon='account'
          />
        </Match>
      </Switch>
    </>
  )
}
