import type { Component } from 'solid-js'
import { Switch, Match } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { CoreLogo } from '~/core/ui/core-logo'
import { Text } from '~/shared/ui/elements/text'

import { authState } from '../auth-state'
import { AuthPhoneNumberStep } from './auth-phone-number-step'
import { AuthCodeStep } from './auth-code-step'
import { AuthPasswordStep } from './auth-password-step'

import * as authContentCSS from './auth-content.sss'

export const AuthContent: Component = () => {
  const getTitle = () => {
    return authState.step === 'phoneNumber' ?
      localeState.texts?.auth.title :
      `+${authState.phone_number_formatted || authState.phone_number}`
  }

  return (
    <>
      <CoreLogo/>

      <Text
        class={authContentCSS.title}
        variant='headline'
        size='large'
      >
        {getTitle()}
      </Text>

      <Switch>
        <Match when={authState.step === 'phoneNumber'}>
          <AuthPhoneNumberStep/>
        </Match>
        <Match when={authState.step === 'code'}>
          <AuthCodeStep/>
        </Match>
        <Match when={authState.step === 'password'}>
          <AuthPasswordStep/>
        </Match>
      </Switch>
    </>
  )
}
