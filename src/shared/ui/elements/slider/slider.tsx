import type { ParentComponent } from 'solid-js'
import { Show, For, createSignal, createMemo, onMount, onCleanup, children, untrack } from 'solid-js'
import PointerTracker from 'pointer-tracker'
import { clsx } from 'clsx'

import { isAndroid } from '~/shared/utils/detect-platform'

import { SliderItem } from './slider-item'

import * as layoutCSS from '../layout.sss'
import * as sliderCSS from './slider.sss'

export type SliderProps = {
  class?: string
  activeIndex: number
  aspectRatio?: number
  onChange?: (index: number) => void
  onClick?: () => void
}

export const Slider: ParentComponent<SliderProps> = (props) => {
  let sliderEl!: HTMLDivElement
  const [getTranslateX, setTranslateX] = createSignal(0)

  const getItems = createMemo(() => (
    children(() => props.children).toArray()
  ))

  const getStyles = createMemo(() => ({
    'aspect-ratio': props.aspectRatio || 'unset'
  }))

  const isSingle = () =>
    getItems().length <= 1

  const handleKey = (ev: KeyboardEvent) => {
    switch (ev.key.toLowerCase()) {
    case ' ':
    case 'enter':
      ev.stopPropagation()
      ev.preventDefault()
      props.onClick?.()
      break
    case 'arrowleft':
      ev.stopPropagation()
      ev.preventDefault()
      props.onChange?.(-1)
      break
    case 'arrowright':
      ev.stopPropagation()
      ev.preventDefault()
      props.onChange?.(1)
      break
    }
  }

  onMount(() => {
    const pointerTracker = new PointerTracker(sliderEl, {
      start: (_pointer, ev) => {
        ev.stopPropagation()
        return true
      },

      move: (_prevPointers, _changedPointers, ev) => {
        const { startPointers, currentPointers } = pointerTracker
        if (startPointers?.length !== 1 && currentPointers?.length !== 1) return

        const x = currentPointers[0].clientX - startPointers[0].clientX
        const y = currentPointers[0].clientY - startPointers[0].clientY
        if ((Math.abs(y) > Math.abs(x)) && !getTranslateX()) return

        ev.stopPropagation()
        ev.preventDefault()
        setTranslateX(x)
      },

      end: () => {
        const translateX = untrack(getTranslateX)
        if (!translateX) {
          props.onClick?.()
          return
        }
        if (Math.abs(translateX) >= 50) {
          props.onChange?.(translateX < 0 ? 1 : -1)
        }
        setTranslateX(0)
      },

      avoidPointerEvents: isAndroid()
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
          sliderCSS.base
        )}
        style={getStyles()}
      >
        <For each={getItems()}>{(child, getIndex) => (
          <SliderItem
            single={isSingle()}
            previous={!isSingle() && getIndex() === props.activeIndex - 1}
            active={!isSingle() && getIndex() === props.activeIndex}
            next={!isSingle() && getIndex() === props.activeIndex + 1}
            translateX={getTranslateX()}
          >
            {child}
          </SliderItem>
        )}</For>

        <div
          class={clsx(
            sliderCSS.overlay,
            !isSingle() && sliderCSS._translatable,
            layoutCSS.outline
          )}
          role='button'
          tabIndex={0}
          ref={sliderEl}
          onKeyDown={handleKey}
        />
      </div>

      <Show when={getItems().length > 1}>
        <div class={clsx(
          sliderCSS.dots,
          layoutCSS.flex,
          layoutCSS.flexCenter
        )}>
          <For each={[...Array(getItems().length).keys()]}>{index => (
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