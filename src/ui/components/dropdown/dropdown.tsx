import type { ParentComponent } from 'solid-js'
import { onMount } from 'solid-js'

import styles from './dropdown.sss'

type Props = {

}

const animationKeyframes: Keyframe[] = [
  { transform: 'scale(0)', opacity: 0 },
  { opacity: 1, offset: 0.5 },
  { transform: 'scale(1)', opacity: 1 }
]

const animationOptions: KeyframeAnimationOptions = {
  duration: 200,
  fill: 'forwards',
  easing: 'ease-in-out'
}

export const Dropdown: ParentComponent<Props> = (props) => {
  let element!: HTMLDivElement
  let animation: Animation

  onMount(() => {
    element.animate(
      animationKeyframes,
      animationOptions
    )
  })

  return (
    <div
      ref={element}
      class={styles.base}
    >
      {props.children}
    </div>
  )
}
