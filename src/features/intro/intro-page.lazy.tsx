import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'

const IntroPage = lazy(async () => {
  const [module] = await Promise.all([
    import('./intro-page'),
    waitI18n()
  ])
  return module
})

export const IntroPageLazy: Component = () => {
  return (
    <Suspense>
      <IntroPage/>
    </Suspense>
  )
}
