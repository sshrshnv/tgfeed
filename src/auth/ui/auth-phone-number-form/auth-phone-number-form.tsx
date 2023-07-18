import type { Component } from 'solid-js'
import { createSignal, createResource, createEffect } from 'solid-js'
import { createInputMask } from '@solid-primitives/input-mask'

import { localeState } from '~/core/locale'

import { authState, setAuthState } from '../../auth-state'
import { getNearestDc, getCountriesList, sendCode } from '../../actions'
import { getPhoneNumberCode, getPhoneNumberMask } from '../../utils'
import { AuthForm } from '../auth-form'

export const AuthPhoneNumberForm: Component = () => {
  let inputEl!: HTMLInputElement
  const [getPhoneNumber, setPhoneNumber] = createSignal<string>()
  const [nearestDcRes] = createResource(() => getNearestDc())
  const [countriesListRes] = createResource(() => getCountriesList())
  const [formRes] = createResource(getPhoneNumber, sendCode)

  const handleInput = (ev) => {
    if (getPhoneNumber()) setPhoneNumber()
    const ref = ev.currentTarget || ev.target
    ref.value = ref.value.trim()
    const mask = getPhoneNumberMask(
      countriesListRes(),
      ev.target.value
    )
    return createInputMask(mask)(ev)
  }

  const handleSubmit = () => {
    const phoneNumber = inputEl.value.replace(/\D/g, '')
    setAuthState({
      phone_number: phoneNumber,
      phone_number_formatted: inputEl.value
    })
    if (phoneNumber) setPhoneNumber(phoneNumber)
  }

  createEffect(() => {
    if (
      !authState.phone_number ||
      countriesListRes.state !== 'ready' ||
      !!inputEl.value
    ) return
    inputEl.value = authState.phone_number
    handleInput({
      currentTarget: inputEl,
      target: inputEl
    })
  })

  createEffect(() => {
    if (
      authState.phone_number ||
      nearestDcRes.state !== 'ready' ||
      countriesListRes.state !== 'ready'
    ) return
    const code = getPhoneNumberCode(
      countriesListRes(),
      nearestDcRes().country
    )
    if (!code) return
    inputEl.value = code
  })

  return (
    <AuthForm
      description={localeState.texts?.auth.phone.description}
      ref={inputEl}
      type='tel'
      icon='plusSmall'
      onInput={handleInput}
      onSubmit={handleSubmit}
      loading={countriesListRes.loading || nearestDcRes.loading || formRes.loading}
      error={countriesListRes.error || nearestDcRes.error || formRes.error}
    />
  )
}
