import type { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as mainCSS from './main.sss'

export type MainProps = ComponentProps<'main'>

export const Main: ParentComponent<MainProps> = (_props) => {
  const [props, mainProps] = splitProps(_props, ['class'])
  return (
    <main {...mainProps}
      class={clsx(
        props.class,
        mainCSS.base,
        layoutCSS.before
      )}
    />
  )
}
