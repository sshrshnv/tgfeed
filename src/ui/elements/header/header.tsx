import type { FlowComponent } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'

import type { ElementStyleProps } from '~/ui/styles'
import { clsxElementStyles } from '~/ui/styles'

import styles from './header.styl'

type Props = ElementStyleProps

export const Header: FlowComponent<Props> = (allProps) => {
  const [props, styleProps] = splitProps(allProps, ['children'])

  const generateClass = createMemo(() =>
    clsxElementStyles({
      class: styles.root,
      display: 'flex',
      flexAlign: 'center',
      width: '100%',
      ...styleProps
    })
  )

  return (
    <header
      class={generateClass()}
    >
      {props.children}
    </header>
  )
}
