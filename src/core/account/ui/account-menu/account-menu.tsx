import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'

import { routes } from '~/core/routes'
import { locale } from '~/core/locale'
import { MenuTitle, MenuButton } from '~/shared/ui/elements'

import { account } from '../../account.state'

export const AccountMenu: Component = () => {
  return (
    <>
      <MenuTitle
        text={locale.texts?.account.title}
      />
      <Switch>
        <Match when={account.authorized}>
          <MenuButton
            text={locale.texts?.account.signOut}
            icon='account'
          />
        </Match>
        <Match when={!account.authorized}>
          <MenuButton
            route={routes.auth}
            text={locale.texts?.account.signIn}
            icon='account'
          />
        </Match>
      </Switch>
    </>
  )
}
