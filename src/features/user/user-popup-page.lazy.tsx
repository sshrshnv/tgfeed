import type { Component } from 'solid-js'

import { PopupPage } from '~/ui/layout'

import { lazyFeature, SuspenseFeature } from '../features'

const PATH = './user-popup-page'

const UserPopupPage = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const UserPopupPageLazy: Component = () => {
  return (
    <PopupPage title="Settings">
      <SuspenseFeature path={PATH}>
        <UserPopupPage/>
      </SuspenseFeature>
    </PopupPage>
  )
}
