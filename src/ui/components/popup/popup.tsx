import type { ParentComponent } from 'solid-js'
import { createSignal, onMount } from 'solid-js'

import type { AnimationState } from '~/ui/utils'
import { createAnimation } from '~/ui/utils'

import CSS from './popup.sss'

type Props = {

}

export const Popup: ParentComponent<Props> = (props) => {
  let element: HTMLDivElement
  let animationState: AnimationState
  const [isActive, setActive] = createSignal(true)

  onMount(() => {
    animationState = createAnimation({ element, isActive })
  })

  return (
    <div
      ref={element!}
      class={CSS.base}
    >
      <div class={CSS.body}>
        {props.children}
      </div>
    </div>
  )
}
