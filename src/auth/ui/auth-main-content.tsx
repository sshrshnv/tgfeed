import type { Component } from 'solid-js'
import { Switch, Match, createMemo } from 'solid-js'

import { localeState } from '~/core/locale'
import { Text, Icon } from '~/shared/ui/elements'

import { authState } from '../auth-state'
import { AuthPhoneNumberForm } from './auth-phone-number-form'
import { AuthCodeForm } from './auth-code-form'
import { AuthPasswordForm } from './auth-password-form'
import * as authMainContentCSS from './auth-main-content.sss'

export const AuthMainContent: Component = () => {
  const getTitle = createMemo(() => {
    return authState.step === 'phoneNumber' ?
      localeState.texts?.auth.title :
      `+${authState.phone_number_formatted || authState.phone_number}`
  })

  return (
    <>
      <Icon
        class={authMainContentCSS.logo}
        name='logoSquircle'
        size='large'
      />

      <Text
        class={authMainContentCSS.title}
        variant='headline'
        size='large'
      >
        {getTitle()}
      </Text>

      <Switch>
        <Match when={authState.step === 'phoneNumber'}>
          <AuthPhoneNumberForm/>
        </Match>
        <Match when={authState.step === 'code'}>
          <AuthCodeForm/>
        </Match>
        <Match when={authState.step === 'password'}>
          <AuthPasswordForm/>
        </Match>
      </Switch>
    </>
  )
}
