import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils'

import * as CSS from './animations.sss'

export const animationsCSS = {
  ...CSS,
  performance: isIOS() ? CSS.iosPerformance : ''
}

type AnimationKeyframes = Parameters<Animatable['animate']>[0]
type AnymationOptions = Parameters<Animatable['animate']>[1]

export type AnimationParams = {
  keyframes: AnimationKeyframes
  options: AnymationOptions
  class?: string
}

const emphasizedDecelerateOptions: AnymationOptions = {
  duration: 400,
  fill: 'forwards',
  easing: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)'
}

const emphasizedAccelerateOptions: AnymationOptions = {
  duration: 200,
  fill: 'forwards',
  easing: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)'
}

const standardDecelerateOptions: AnymationOptions = {
  duration: 200,
  fill: 'forwards',
  easing: 'cubic-bezier(0, 0, 0, 1)'
}

const standardAccelerateOptions: AnymationOptions = {
  duration: 200,
  fill: 'forwards',
  easing: 'cubic-bezier(0.3, 0, 1, 1)'
}

export const slideInRightAnimation: AnimationParams = {
  keyframes: [
    { scale: '0.75 1', translate: '-96px', opacity: 0 },
    { scale: '1 1', translate: '0', opacity: 1 }
  ],
  options: emphasizedDecelerateOptions,
  class: clsx(
    animationsCSS.slideInRightAnimation,
    animationsCSS.performance
  )
}

export const slideOutLeftAnimation = {
  keyframes: [
    { scale: '1 1', translate: '0', opacity: 1 },
    { scale: '0.75 1', translate: '-48px', opacity: 0 }
  ],
  options: emphasizedAccelerateOptions
}

export const slideInBottomAnimation: AnimationParams = {
  keyframes: [
    { scale: '1 0.75', translate: '0 -24px', opacity: 0 },
    { scale: '1 1', translate: '0 0', opacity: 1 }
  ],
  options: emphasizedDecelerateOptions,
  class: clsx(
    animationsCSS.slideInBottomAnimation,
    animationsCSS.performance
  )
}

export const slideOutTopAnimation = {
  keyframes: [
    { scale: '1 1', translate: '0 0', opacity: 1 },
    { scale: '1 0.75', translate: '0 -24px', opacity: 0 }
  ],
  options: emphasizedAccelerateOptions
}
