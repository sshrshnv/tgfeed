import type { ParentComponent } from 'solid-js'

import formStyles from './form.sss'

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
      class={formStyles.base}
      autocomplete='off'
      autocapitalize='off'
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  )
}
