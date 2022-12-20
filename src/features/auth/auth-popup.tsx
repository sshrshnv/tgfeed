import type { Component } from 'solid-js'
import { lazy, Suspense, Show } from 'solid-js'

import { ROUTES, useRoutingState } from '~/routing'
import { createAnimation } from '~/ui/utils'
import { Popup } from '~/ui/components'

import { loadAuthModule } from './auth.module'

const COMPONENT_PATH = './auth-form'

const AuthForm = lazy(async () => {
  const [component] = await loadAuthModule(
    COMPONENT_PATH,
    () => import(`${COMPONENT_PATH}`)
  )
  return component
})

export const AuthPopup: Component = () => {
  const routingState = useRoutingState()
  const animationState = createAnimation()

  return (
    <Show when={ROUTES.authPopup.popupId}>
      <Popup>
        <Suspense>
          <AuthForm/>
        </Suspense>
      </Popup>
    </Show>
  )
}
