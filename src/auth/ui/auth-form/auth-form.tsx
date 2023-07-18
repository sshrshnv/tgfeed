import type { ParentComponent, Ref } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import type { FormProps, InputProps, IconProps } from '~/shared/ui/elements'
import { Text, Form, Input, Button, Icon } from '~/shared/ui/elements'

import { authState, setAuthState } from '../../auth-state'
import { generateRecoverLink } from '../../utils'
import * as layoutCSS from '../../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../../shared/ui/elements/animations.sss'
import * as authFormCSS from './auth-form.sss'

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

export const AuthForm: ParentComponent<AuthFormProps> = (props) => {
  const handleChangePhoneNumber = () => {
    setAuthState({ step: 'phoneNumber' })
  }

  return (
    <>
      <Text
        class={authFormCSS.description}
        variant='body'
        size='large'
      >
        {props.description}
      </Text>

      <Form
        class={authFormCSS.form}
        onSubmit={props.onSubmit}
      >
        <Show when={props.icon}>
          <Icon
            class={authFormCSS.icon}
            name={props.icon!}
            size='small'
          />
        </Show>

        <Input
          class={authFormCSS.input}
          ref={props.ref}
          type={props.type}
          placeholder={props.placeholder}
          inputMode={props.type === 'tel' ? 'numeric' : 'text'}
          disabled={props.loading}
          onInput={props.onInput}
          autofocus={!props.loading}
        />

        <Button
          class={authFormCSS.button}
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
          class={authFormCSS.error}
          variant='label'
          size='large'
        >
          {localeState.texts?.auth.error[props.error!.message] || localeState.texts?.auth.error.unknown}
        </Text>
      </Show>

      <div class={clsx(
        authFormCSS.footer,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}>
        <Show when={props.error?.message === 'PHONE_NUMBER_BANNED'}>
          <a
            class={authFormCSS.footerButton}
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
            class={authFormCSS.footerButton}
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
