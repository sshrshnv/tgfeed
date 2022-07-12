import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'
import { initDb } from '~/db'
import { initApi } from '~/api'

const Landing = lazy(async () => {
  const [module] = await Promise.all([
    import('./landing'),
    waitI18n(),
    initDb(),
    initApi()
  ])
  return module
})

export const LandingLazy: Component = () => {
  return (
    <Suspense>
      <Landing/>
    </Suspense>
  )
}
