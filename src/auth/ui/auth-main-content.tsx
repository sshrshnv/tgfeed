import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'

import { auth } from '../auth.state'
import { AuthPhoneNumberForm } from './auth-phone-number-form'
import { AuthCodeForm } from './auth-code-form'
import { AuthPasswordForm } from './auth-password-form'

export const AuthMainContent: Component = () => {
  return (
    <Switch>
      <Match when={auth.step === 'phoneNumber'}>
        <AuthPhoneNumberForm/>
      </Match>
      <Match when={auth.step === 'code'}>
        <AuthCodeForm/>
      </Match>
      <Match when={auth.step === 'password'}>
        <AuthPasswordForm/>
      </Match>
    </Switch>
  )
}
