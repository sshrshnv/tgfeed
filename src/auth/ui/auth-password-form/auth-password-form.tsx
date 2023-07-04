import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { Text } from '~/shared/ui/elements'

import { AuthForm } from '../auth-form'

export const AuthPasswordForm: Component = () => {
  const handleSubmit = () => {
    //
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
    >
      <Text variant='label' size='large'>
        {locale.texts?.auth.password.description}
      </Text>
    </AuthForm>
  )
}
