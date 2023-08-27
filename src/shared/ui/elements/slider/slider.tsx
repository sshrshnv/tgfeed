import type { ParentComponent } from 'solid-js'
import { Show, For, onMount, onCleanup, createSignal, children, untrack } from 'solid-js'
import PointerTracker from 'pointer-tracker'
import { clsx } from 'clsx'

import { SliderItem } from './slider-item'

import * as layoutCSS from '../layout.sss'
import * as sliderCSS from './slider.sss'

export type SliderProps = {
  class?: string
  activeIndex: number
  aspectRatio?: number
  onChange?: (index: number) => void
}

export const Slider: ParentComponent<SliderProps> = (props) => {
  let sliderEl!: HTMLDivElement
  const items = children(() => props.children).toArray()
  const [getTranslateX, setTranslateX] = createSignal(0)

  onMount(() => {
    const pointerTracker = new PointerTracker(sliderEl, {
      start: (_pointer, _ev) => items.length > 1,

      move: (_prevPointers, _changedPointers, ev) => {
        const { startPointers, currentPointers } = pointerTracker
        if (startPointers?.length !== 1 && currentPointers?.length !== 1) return

        const x = currentPointers[0].clientX - startPointers[0].clientX
        const y = currentPointers[0].clientY - startPointers[0].clientY
        if (Math.abs(y) > Math.abs(x)) return

        ev.stopPropagation()
        ev.preventDefault()
        setTranslateX(x)
      },

      end: () => {
        const translateX = untrack(getTranslateX)
        if (Math.abs(translateX) >= 50) {
          props.onChange?.(translateX < 0 ? 1 : -1)
        }
        setTranslateX(0)
      },

      avoidPointerEvents: true
    })

    onCleanup(() => {
      pointerTracker.stop()
    })
  })

  return (
    <>
      <div
        class={clsx(
          props.class,
          sliderCSS.base,
          items.length > 1 && sliderCSS._enabled
        )}
        style={{
          '--local-aspect-ratio': props.aspectRatio || 'auto',
          '--local-translate': `${getTranslateX()}px 0`
        }}
        ref={sliderEl}
      >
        <For each={items}>{(child, getIndex) => {
          return (
            <SliderItem
              previous={getIndex() === props.activeIndex - 1}
              active={getIndex() === props.activeIndex}
              next={getIndex() === props.activeIndex + 1}
              transitionable={!getTranslateX()}
            >
              {child}
            </SliderItem>
          )
        }}</For>
      </div>

      <Show when={items.length > 1}>
        <div class={clsx(
          sliderCSS.dots,
          layoutCSS.flex,
          layoutCSS.flexCenter
        )}>
          <For each={[...Array(items.length).keys()]}>{index => (
            <div class={clsx(
              sliderCSS.dotsItem,
              index === props.activeIndex && sliderCSS._active
            )}/>
          )}</For>
        </div>
      </Show>
    </>
  )
}
