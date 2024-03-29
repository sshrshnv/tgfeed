import type { Component } from 'solid-js'
import { createSignal, createResource, createEffect } from 'solid-js'
import { createInputMask } from '@solid-primitives/input-mask'

import { localeState } from '~/core/locale/locale-state'

import { authState, setAuthState } from '../auth-state'
import { getNearestDc } from '../actions/get-nearest-dc'
import { getCountriesList } from '../actions/get-countries-list'
import { sendCode } from '../actions/send-code'
import { getPhoneNumberCode } from '../utils/get-phone-number-code'
import { getPhoneNumberMask } from '../utils/get-phone-number-mask'
import { AuthStep } from './auth-step'

export const AuthPhoneNumberStep: Component = () => {
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
    <AuthStep
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
