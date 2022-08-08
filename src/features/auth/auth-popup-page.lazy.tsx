import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'

const AuthPopupPage = lazy(async () => {
  const [module] = await Promise.all([
    import('./auth-popup-page'),
    waitI18n()
  ])
  return module
})

export const AuthPopupPageLazy: Component = () => {
  return (
    <Suspense>
      <AuthPopupPage/>
    </Suspense>
  )
}
