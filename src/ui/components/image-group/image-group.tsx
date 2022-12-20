import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { layoutCSS } from '~/ui/css'

import CSS from './image-group.sss'

type Props = {

}

export const ImageGroup: ParentComponent<Props> = (props) => {
  return (
    <div class={clsx(
      layoutCSS.after,
      CSS.base
    )}>
      {props.children}
    </div>
  )
}
