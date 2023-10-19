import type { ParentComponent, Ref } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'

import type { FormProps } from '~/shared/ui/elements/form'
import { Form } from '~/shared/ui/elements/form'
import type { InputProps } from '~/shared/ui/elements/input'
import { Input } from '~/shared/ui/elements/input'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'
import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'

import { authState, setAuthState } from '../auth-state'
import { generateRecoverLink } from '../utils/generate-recover-link'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as animationsCSS from '~/shared/ui/animations/animations.sss'
import * as authStepCSS from './auth-step.sss'

export type AuthFormProps = {
  description?: string
  ref: Ref<HTMLInputElement>
  type: 'tel' | 'password'
  placeholder?: string
  icon?: IconProps['name']
  loading?: boolean
  error?: Error
  onInput?: InputProps['onInput']
  onSubmit: FormProps['onSubmit']
}

export const AuthStep: ParentComponent<AuthFormProps> = (props) => {
  const handleChangePhoneNumber = () => {
    setAuthState({ step: 'phoneNumber' })
  }

  return (
    <>
      <Text
        class={authStepCSS.description}
        variant='body'
        size='large'
      >
        {props.description}
      </Text>

      <Form
        class={authStepCSS.form}
        onSubmit={props.onSubmit}
      >
        <Show when={props.icon}>
          <Icon
            class={authStepCSS.icon}
            name={props.icon!}
            size='small'
          />
        </Show>

        <Input
          class={authStepCSS.input}
          ref={props.ref}
          type={props.type}
          placeholder={props.placeholder}
          inputMode={props.type === 'tel' ? 'numeric' : 'text'}
          disabled={props.loading}
          onInput={props.onInput}
          autofocus={!props.loading}
        />

        <Button
          class={authStepCSS.button}
          type='submit'
          disabled={props.loading}
        >
          <Icon
            class={clsx(
              props.loading && animationsCSS.rotate
            )}
            name={props.loading ? 'loader' : 'arrowForward'}
            size='large'
          />
        </Button>
      </Form>

      <Show when={props.error}>
        <Text
          class={authStepCSS.error}
          variant='label'
          size='large'
        >
          {localeState.texts?.auth.error[props.error!.message] || localeState.texts?.auth.error.unknown}
        </Text>
      </Show>

      <div class={clsx(
        authStepCSS.footer,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}>
        <Show when={props.error?.message === 'PHONE_NUMBER_BANNED'}>
          <a
            class={authStepCSS.footerButton}
            href={generateRecoverLink(authState.phone_number)}
            target='_blank'
            rel="noopener noreferrer"
          >
            <Text variant='label' size='large'>
              {localeState.texts?.auth.button.recover}
            </Text>
          </a>
        </Show>

        <Show when={authState.step === 'code'}>
          <Button
            class={authStepCSS.footerButton}
            onClick={handleChangePhoneNumber}
          >
            <Text variant='label' size='large'>
              {localeState.texts?.auth.button.change}
            </Text>
          </Button>
        </Show>
      </div>
    </>
  )
}
