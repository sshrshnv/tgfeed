import type { ParentComponent } from 'solid-js'

import * as formCSS from './form.sss'

type Props = {
  onSubmit?: () => void
}

export const Form: ParentComponent<Props> = (props) => {
  const handleSubmit = ev => {
    ev.preventDefault()
    props.onSubmit?.()
  }

  return (
    <form
      class={formCSS.base}
      autocomplete='off'
      autocapitalize='off'
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  )
}
