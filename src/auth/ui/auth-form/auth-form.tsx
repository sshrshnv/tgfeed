import type { ParentComponent } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import { locale } from '~/core/locale'
import type { FormProps } from '~/shared/ui/elements'
import { Form, Text, Button } from '~/shared/ui/elements'

import * as authFormCSS from './auth-form.sss'

export type AuthFormProps = FormProps & {
  description?: string
  disabled?: boolean
}

export const AuthForm: ParentComponent<AuthFormProps> = (_props) => {
  const [props, formProps] = splitProps(_props, [
    'class', 'description', 'disabled', 'children'
  ])

  return (
    <Form {...formProps}
      class={clsx(
        props.class,
        authFormCSS.base
      )}
    >
      <Text
        class={authFormCSS.description}
        variant='label'
        size='large'
      >
        {props.description}
      </Text>

      {props.children}

      <Button
        class={authFormCSS.button}
        type='submit'
        disabled={props.disabled}
      >
        <Text variant='label' size='large'>
          {locale.texts?.auth.button.next}
        </Text>
      </Button>
    </Form>
  )
}
