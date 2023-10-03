import type { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as footerCSS from './footer.sss'

export type FooterProps = ComponentProps<'footer'>

export const Footer: ParentComponent<FooterProps> = (_props) => {
  const [props, footerProps] = splitProps(_props, ['class'])

  return (
    <footer {...footerProps}
      class={clsx(
        props.class,
        footerCSS.base,
        layoutCSS.before
      )}
    />
  )
}
