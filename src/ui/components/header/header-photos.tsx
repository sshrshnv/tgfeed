import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { layoutCSS } from '~/ui/css'

import CSS from './header-photos.sss'

type Props = {

}

export const HeaderPhotos: ParentComponent<Props> = (props) => {
  return (
    <div class={clsx(
      layoutCSS.after,
      CSS.base
    )}>
      {props.children}
    </div>
  )
}
