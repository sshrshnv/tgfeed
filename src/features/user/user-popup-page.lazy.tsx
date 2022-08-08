import type { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Suspense } from 'solid-js/web'

const UserPopupPage = lazy(async () => {
  const [module] = await Promise.all([
    import('./user-popup-page')
  ])
  return module
})

export const UserPopupPageLazy: Component = () => {
  {console.log('yeeeeeeeeeeee lazy')}
  return (
    <Suspense>
      <UserPopupPage/>
    </Suspense>
  )
}
