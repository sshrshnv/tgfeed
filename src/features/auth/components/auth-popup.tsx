import type { Component } from 'solid-js'
import { lazy, Suspense } from 'solid-js'

import { Pane } from '~/ui/components'

import { loadAuthModule } from '../auth.module'

const COMPONENT_PATH = './auth-form'

const AuthForm = lazy(async () => {
  const [component] = await loadAuthModule(
    COMPONENT_PATH,
    () => import(`${COMPONENT_PATH}`)
  )
  return component
})

export const AuthPane: Component = () => {
  return (
    <Pane>
      <Suspense>
        <AuthForm/>
      </Suspense>
    </Pane>
  )
}
