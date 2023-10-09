import type { Component } from 'solid-js'
import { Show } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { authRoutes } from '~/auth/auth-routes'
import { reregisterServiceWorker } from '~/shared/service/utils/reregister-service-worker'
import { MenuTitle, MenuRouteButton, MenuButton } from '~/shared/ui/elements/menu'

import { logOut } from '../actions/log-out'
import { accountState } from '../account-state'

export const AccountMenu: Component = () => {
  const reconnect = () =>
    reregisterServiceWorker(0)

  return (
    <>
      <Show when={!accountState.authorized}>
        <MenuRouteButton
          route={authRoutes.page}
          text={localeState.texts?.account.signIn}
          variant='primary'
          icon='account'
        />
      </Show>
      <MenuTitle
        text={localeState.texts?.account.title}
      />
      <MenuButton
        text={localeState.texts?.account.reconnect}
        icon='syncError'
        onClick={reconnect}
      />
      <Show when={accountState.authorized}>
        <MenuButton
          text={localeState.texts?.account.signOut}
          icon='logout'
          onClick={logOut}
        />
      </Show>
    </>
  )
}
