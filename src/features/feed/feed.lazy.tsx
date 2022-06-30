import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { waitI18n } from '~/i18n'

const Feed = lazy(async () => {
  const [module] = await Promise.all([
    import('./feed'),
    waitI18n()
  ])
  return module
})

export const FeedLazy: Component = () => {
  return (
    <Suspense>
      <Feed/>
    </Suspense>
  )
}
