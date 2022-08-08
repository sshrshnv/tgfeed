import type { Component } from 'solid-js'

import { Page } from '~/ui/layout'

import { Auth } from './auth'

const AuthPopupPage: Component = () => {
  return (
    <Page>
      <Auth/>
    </Page>
  )
}

export default AuthPopupPage
