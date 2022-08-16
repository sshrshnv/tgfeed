import type { ParentComponent } from 'solid-js'
import { onMount, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { useRoute } from '~/router'
import { Block } from '~/ui/layout'

import { PopupPageHeader } from './popup-page-header'
import styles from './popup-page.sass'

type Props = {
  title?: string
}

const animationKeyframes = [
  { transform: 'translateX(80px)', opacity: 0 },
  { transform: 'translateX(0)', opacity: 1 }
]

const animationOptions = {
  duration: 200,
  fill: 'forwards' as FillMode,
  easing: 'ease-in-out'
}

export const PopupPage: ParentComponent<Props> = (props) => {
  const { isMatch, setTransition } = useRoute()

  let element: HTMLDivElement
  let animation: Animation

  onMount(() => {
    setTransition(true)

    animation = element.animate(
      animationKeyframes,
      animationOptions
    )
  })

  createEffect(() => {
    if (isMatch()) return

    animation.reverse()
    animation.finished.then(() =>
      setTransition(false)
    )
  })

  return (
    <Block
      ref={element!}
      class={clsx(
        styles.base
      )}
    >
      <PopupPageHeader>
        {props.title}
      </PopupPageHeader>

      {props.children}
    </Block>
  )
}
