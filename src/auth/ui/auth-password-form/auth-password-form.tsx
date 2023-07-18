import type { Component } from 'solid-js'
import { createSignal, createResource } from 'solid-js'

import { localeState } from '~/core/locale'

import { checkPassword } from '../../actions'
import { AuthForm } from '../auth-form'

export const AuthPasswordForm: Component = () => {
  let inputEl!: HTMLInputElement
  const [getPassword, setPassword] = createSignal<string>()
  const [formRes] = createResource(getPassword, checkPassword)

  const handleSubmit = () => {
    const password = inputEl.value.trim()
    if (password) setPassword(password)
  }

  return (
    <AuthForm
      description={localeState.texts?.auth.password.description}
      ref={inputEl}
      type='password'
      loading={formRes.loading}
      error={formRes.error}
      onSubmit={handleSubmit}
    />
  )
}
