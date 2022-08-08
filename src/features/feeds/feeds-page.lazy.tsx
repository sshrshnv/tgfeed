import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'

const FeedsPage = lazy(async () => {
  const [module] = await Promise.all([
    import('./feeds-page'),
    waitI18n()
  ])
  return module
})

export const FeedsPageLazy: Component = () => {
  return (
    <Suspense>
      <FeedsPage/>
    </Suspense>
  )
}
