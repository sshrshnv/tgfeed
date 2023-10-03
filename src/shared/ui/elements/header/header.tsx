import type { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as headerCSS from './header.sss'

export type HeaderProps = ComponentProps<'header'> & {
  hidden?: boolean
}

export const Header: ParentComponent<HeaderProps> = (_props) => {
  const [props, headerProps] = splitProps(_props, ['class', 'hidden'])

  return (
    <header {...headerProps}
      class={clsx(
        props.class,
        headerCSS.base,
        props.hidden && headerCSS._hidden,
        layoutCSS.before,
        layoutCSS.after
      )}
    />
  )
}
