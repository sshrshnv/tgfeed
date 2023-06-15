import { ParentComponent, ComponentProps } from 'solid-js'

import * as asideCSS from './aside.sss'

export type AsideProps = ComponentProps<'aside'>

export const Aside: ParentComponent<AsideProps> = (props) => {
  return (
    <aside {...props}
      class={asideCSS.base}
    />
  )
}
