import type { Component } from 'solid-js'

import { locale } from '~/core/locale'
import { Text } from '~/shared/ui/elements'

import { AuthForm } from '../auth-form'

export const AuthCodeForm: Component = () => {
  const handleSubmit = () => {
    //
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
    >
      <Text variant='label' size='large'>
        {locale.texts?.auth.code['auth.sentCodeTypeApp']}
      </Text>
    </AuthForm>
  )
}
