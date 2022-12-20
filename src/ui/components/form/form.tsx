import type { ParentComponent } from 'solid-js'

import CSS from './form.sss'

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
      class={CSS.base}
      autocomplete='off'
      autocapitalize='off'
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  )
}
