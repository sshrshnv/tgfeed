import type { ParentComponent } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import { clsx } from 'clsx'

import { createAnimation } from '~/ui/animations'

type Props = {
  position: 'left' | 'right'
}

export const Sheet: ParentComponent<Props> = (props) => {
  const [isOpened, setOpened] = createSignal(false)
  const animation = createAnimation({ isActive: isOpened })

  return (
    <>

      <div
        ref={animation.elementRef}
        class={clsx(
          animation.elementStyles
        )}
      >
        <div></div>
        <div>
          {props.children}
        </div>
      </div>
    </>
  )
}
