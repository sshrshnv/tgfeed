import type { ParentComponent } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'
import cl from 'clsx'

import classes from './block.styl'

type Position = 'absolute' | 'relative'
type Location = '0px'
type ZIndex = -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type Width = 'auto' | '100%' | '100vw'
type Height = 'auto' | '100%' | '100vh'

type Props = {
  class?: string

  position?: Position
  top?: Location
  right?: Location
  bottom?: Location
  left?: Location
  zIndex?: ZIndex

  flex?: boolean
  flexDirection?: 'column'
  flexJustify?: 'center' | 'flex-end'
  flexAlign?: 'center' | 'flex-end'
  flexGrow?: 1 | 2

  width?: Width
  minWidth?: Width
  maxWidth?: Width
  height?: Height
  minHeight?: Height
  maxHeight?: Height
}

export const Block: ParentComponent<Props> = (props) => {
  const [generalProps, classesProps] = splitProps(props, ['children'])

  const getPropClass = (prop: string, value: Props[keyof Props]) => {
    if (prop === 'class') return value
    const safeValue = typeof value === 'string' ? value.replace('%', 'pct') : value
    const postfix = ['string', 'number'].includes(typeof value) ? `_${safeValue}` : ''
    return classes[`_${prop}${postfix}`]
  }

  const getClass = createMemo(() => cl(
    ...Object.entries(classesProps).map(([prop, value]) => !!value && getPropClass(prop, value))
  ))

  return (
    <div class={getClass()}>
      {generalProps.children}
    </div>
  )
}
