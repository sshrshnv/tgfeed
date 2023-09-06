type TranslateScaleArgs = {
  translate: `${string} ${string}`
  x?: boolean
  y?: boolean
}
export const getTranslateScaleInParams = ({ translate, x = false, y = false }: TranslateScaleArgs) => ({
  keyframes: [
    { translate, scale: x ? '0.9 1' : y ? '1 0.9' : '1 1', opacity: '0' },
    { translate: '0 0', scale: '1 1', opacity: '1' }
  ],
  options: {
    easing: 'cubic-bezier(0, 0, 0, 1)',
    fill: 'forwards' as FillMode,
    duration: 300
  }
})
export const getTranslateScaleOutParams = ({ translate }: TranslateScaleArgs) => ({
  keyframes: [
    { translate: '0 0', opacity: '1' },
    { translate, opacity: '0' }
  ],
  options: {
    easing: 'cubic-bezier(0.3, 0, 1, 1)',
    fill: 'forwards' as FillMode,
    duration: 150
  }
})

type TranslateArgs = {
  translate: `${string} ${string}`
}
export const getTranslateInParams = ({ translate }: TranslateArgs) => ({
  keyframes: [
    { translate, opacity: '0' },
    { translate: '0 0', opacity: '1' }
  ],
  options: {
    easing: 'cubic-bezier(0, 0, 0, 1)',
    fill: 'forwards' as FillMode,
    duration: 300
  }
})
export const getTranslateOutParams = ({ translate }: TranslateArgs) => ({
  keyframes: [
    { translate: '0 0', opacity: '1' },
    { translate, opacity: '0' }
  ],
  options: {
    easing: 'cubic-bezier(0.3, 0, 1, 1)',
    fill: 'forwards' as FillMode,
    duration: 150
  }
})

type ScaleArgs = {
  scale: `${number} ${number}`
}
export const getScaleInParams = ({ scale }: ScaleArgs) => ({
  keyframes: [
    { scale, opacity: '0' },
    { scale: '1 0.9', opacity: '0.25', offset: 0.75 },
    { scale: '1 1', opacity: '1' },
  ],
  options: {
    easing: 'cubic-bezier(0, 0, 0, 1)',
    fill: 'forwards' as FillMode,
    duration: 300
  }
})
export const getScaleOutParams = ({ scale }: ScaleArgs) => ({
  keyframes: [
    { scale: '1 1', opacity: '1' },
    { opacity: '0.1', offset: 0.25 },
    { scale, opacity: '0' }
  ],
  options: {
    easing: 'cubic-bezier(0.3, 0, 1, 1)',
    fill: 'forwards' as FillMode,
    duration: 150
  }
})
