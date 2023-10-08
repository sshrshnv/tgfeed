import type { ParentComponent } from 'solid-js'
import { Show, For, createSignal, createMemo, onMount, onCleanup, children, untrack } from 'solid-js'
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
  onClick?: () => void
}

export const Slider: ParentComponent<SliderProps> = (props) => {
  let sliderEl!: HTMLDivElement
  let translateY = 0
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
        ev.stopImmediatePropagation()
        if (pointerTracker.currentPointers.length !== 0) {
          return false
        }
        return true
      },

      move: ([prevPointer], _changedPointers, ev) => {
        ev.stopImmediatePropagation()
        ev.preventDefault()

        const [currentPointer] = pointerTracker.currentPointers
        const x = currentPointer.clientX - prevPointer.clientX
        const y = currentPointer.clientY - prevPointer.clientY
        translateY += y

        if ((Math.abs(y) > Math.abs(x)) && !getTranslateX()) return
        setTranslateX(value => value + x)
      },

      end: () => {
        const translateX = untrack(getTranslateX)
        if (!translateX && !translateY) {
          props.onClick?.()
          return
        }
        if (Math.abs(translateX) >= 50) {
          props.onChange?.(translateX < 0 ? 1 : -1)
        }
        translateY = 0
        setTranslateX(0)
      }
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
