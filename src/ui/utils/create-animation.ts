import type { Accessor, Setter } from 'solid-js'
import { onMount, createEffect, createSignal, batch } from 'solid-js'
import { clsx } from 'clsx'

import { isIOS } from '~/utils'
import { animationCSS } from '~/ui/css'

type AnimationParams = {
  element: Element
  isActive: Accessor<boolean>
}

export type AnimationState = {
  animationClass: string
  isPending: Accessor<boolean>
  isEntered: Accessor<boolean>
  isExited: Accessor<boolean>
}

export const createAnimation = (params: AnimationParams) => {
  let animation: Animation

  const animationClass = clsx(
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
    animation = params.element.animate(null)
    onFinish(setEntered)
  })

  createEffect(() => {
    console.log('isActive', params.isActive())
    //if (!params.reversable || params.isActive()) return
    //animation.reverse()
    //onFinish(params.onCleanup)
  })

  return {
    animationClass,
    isPending,
    isEntered,
    isExited
  }
}
