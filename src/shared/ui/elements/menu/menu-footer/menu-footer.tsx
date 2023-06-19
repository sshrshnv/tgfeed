import type { ParentComponent, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../../layout.sss'
import * as menuFooterCSS from './menu-footer.sss'

export type MenuFooterProps = ComponentProps<'footer'>

export const MenuFooter: ParentComponent<MenuFooterProps> = (props) => {
  return (
    <footer class={clsx(
      menuFooterCSS.base,
      layoutCSS.flex
    )}>
      {props.children}
    </footer>
  )
}
