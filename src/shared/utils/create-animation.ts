import type { Accessor, Setter, Ref } from 'solid-js'
import { onMount, createEffect, createSignal, batch } from 'solid-js'
import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils'
import animationCSS from '~/shared/elements/animations.sss'

type AnimationParams = {
  isActive: Accessor<boolean>
}

export type AnimationState = {
  elementRef: Ref<Element>
  elementCl: string
  isPending: Accessor<boolean>
  isEntered: Accessor<boolean>
  isExited: Accessor<boolean>
}

export const createAnimation = (params: AnimationParams) => {
  let animation: Animation
  let element: Element

  const elementRef = ref => element = ref

  const elementCSS= clsx(
    isIOS() && animationCSS.performance
  )

  const [isPending, setPending] = createSignal(true)
  const [isEntered, setEntered] = createSignal(false)
  const [isExited, setExited] = createSignal(false)

  const onFinish = async (cb: Setter<boolean>) => {
    await animation?.finished
    batch(() => {
      setPending(false)
      cb(true)
    })
  }

  onMount(async () => {
    animation = element.animate(null)
    onFinish(setEntered)
  })

  createEffect(() => {
    console.log('isActive', params.isActive())
    //if (!params.reversable || params.isActive()) return
    //animation.reverse()
    //onFinish(params.onCleanup)
  })

  return {
    elementRef,
    elementCSS,
    isPending,
    isEntered,
    isExited
  }
}
