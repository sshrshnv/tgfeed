import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'

const Auth = lazy(async () => {
  const [module] = await Promise.all([
    import('./auth'),
    waitI18n()
  ])
  return module
})

export const AuthLazy: Component = () => {
  return (
    <Suspense>
      <Auth/>
    </Suspense>
  )
}
