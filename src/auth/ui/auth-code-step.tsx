import type { Component } from 'solid-js'
import { createSignal, createResource, createMemo } from 'solid-js'
import { createInputMask } from '@solid-primitives/input-mask'

import { localeState } from '~/core/locale'

import { authState } from '../auth-state'
import { signIn } from '../actions'
import { getCodeMask } from '../utils'
import { AuthStep } from './auth-step'

export const AuthCodeStep: Component = () => {
  let inputEl!: HTMLInputElement
  const [getCode, setCode] = createSignal<string>()
  const [formRes] = createResource(getCode, signIn)

  const getInputCodeMask = createMemo(() => {
    return getCodeMask(authState.meta?.type)
  })

  const getInputPlaceholderCodeMask = createMemo(() => {
    return getCodeMask(authState.meta?.type, '0')
  })

  const handleInput = (ev) => {
    if (getCode()) setCode()
    const ref = ev.currentTarget || ev.target
    ref.value = ref.value.trim()
    const mask = getInputCodeMask()
    return createInputMask(mask)(ev)
  }

  const handleSubmit = () => {
    const code = inputEl.value.replace(/\D/g, '')
    if (code) setCode(code)
  }

  return (
    <AuthStep
      description={localeState.texts?.auth.code.description}
      ref={inputEl}
      type='tel'
      placeholder={getInputPlaceholderCodeMask()}
      loading={formRes.loading}
      error={formRes.error}
      onInput={handleInput}
      onSubmit={handleSubmit}
    />
  )
}
