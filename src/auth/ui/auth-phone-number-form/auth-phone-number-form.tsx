import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { Input, Button } from '~/shared/ui/elements'

import { AuthForm } from '../auth-form'
import * as authFormCSS from '../auth-form/auth-form.sss'

export const AuthPhoneNumberForm: Component = () => {
  const handleSubmit = () => {
    //
  }

  return (
    <AuthForm
      description={locale.texts?.auth.phone.description}
      onSubmit={handleSubmit}
      disabled
    >
      <Input
        class={authFormCSS.input}
        placeholder={locale.texts?.auth.phone.label}
        autofocus
      />
    </AuthForm>
  )
}
