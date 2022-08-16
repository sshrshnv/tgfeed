import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

import { PopupPage } from '~/ui/layout'

const SettingsPopupPage = lazy(async () => {
  const [module] = await Promise.all([
    import('./settings-popup-page')
  ])
  return module
})

export const SettingsPopupPageLazy: Component = () => {
  return (
    <PopupPage>
      <Suspense>
        <SettingsPopupPage/>
      </Suspense>
    </PopupPage>
  )
}
