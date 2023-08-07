import type { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as formCSS from './form.sss'

export type FormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit?: (data: FormData) => void
}

export const Form: ParentComponent<FormProps> = (_props) => {
  const [props, formProps] = splitProps(_props, ['class', 'onSubmit'])

  const handleSubmit = ev => {
    ev.preventDefault()
    const data = new self.FormData(ev.target)
    props.onSubmit?.(data)
  }

  return (
    <form {...formProps}
      class={clsx(
        props.class,
        formCSS.base,
        layoutCSS.flex
      )}
      autocomplete='off'
      autocapitalize='off'
      onSubmit={handleSubmit}
    />
  )
}
