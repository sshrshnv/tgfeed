import { clsx } from 'clsx'

import elementStyles from './element.styles.styl'

/* Waiting https://github.com/microsoft/TypeScript/issues/32063 */
type Values = typeof import('./element.styles.json')
type PositionValues = keyof Values['position']
type LocationValues = keyof Values['location']
type ZIndexValues = keyof Values['zIndex']
type DisplayValues = keyof Values['display']
type FlexDirectionValues = keyof Values['flexDirection']
type FlexJustifyValues = keyof Values['flexJustify']
type FlexAlignValues = keyof Values['flexAlign']
type FlexGrowValues = keyof Values['flexGrow']
type WidthValues = keyof Values['width']
type HeightValues = keyof Values['height']
type PaddingValues = keyof Values['padding']
type OverflowValues = keyof Values['overflow']
type ScrollbarValues = keyof Values['scrollbar']
type FontSizeValues = keyof Values['fontSize']
type FontWeightValues = keyof Values['fontWeight']
type TextAlignValues = keyof Values['textAlign']
type TextTransformValues = keyof Values['textTransform']
type TextOverflowValues = keyof Values['textOverflow']
type OpacityValues = keyof Values['opacity']
type TransitionPValues = keyof Values['transitionP']
type TransitionDValues = keyof Values['transitionD']
type TransitionTFValues = keyof Values['transitionTF']
type WillChangeValues = keyof Values['willChange']

type PaddingCombinedValues = PaddingValues |
  `${PaddingValues} ${PaddingValues}` |
  `${PaddingValues} ${PaddingValues} ${PaddingValues}` |
  `${PaddingValues} ${PaddingValues} ${PaddingValues} ${PaddingValues}`

type TransitionCombinedValues =
  `${TransitionPValues} ${TransitionDValues} ${TransitionTFValues}`

export type ElementStyleProps = {
  class?: string

  position?: PositionValues
  top?: LocationValues
  right?: LocationValues
  bottom?: LocationValues
  left?: LocationValues
  zIndex?: ZIndexValues

  display?: DisplayValues
  flexDirection?: FlexDirectionValues
  flexJustify?: FlexJustifyValues
  flexAlign?: FlexAlignValues
  flexGrow?: FlexGrowValues

  width?: WidthValues
  minWidth?: WidthValues
  maxWidth?: WidthValues
  height?: HeightValues
  minHeight?: HeightValues
  maxHeight?: HeightValues
  padding?: PaddingCombinedValues
  paddingTop?: PaddingValues
  paddingRight?: PaddingValues
  paddingBottom?: PaddingValues
  paddingLeft?: PaddingValues

  overflow?: OverflowValues
  scrollbar?: ScrollbarValues

  fontSize?: FontSizeValues
  fontWeight?: FontWeightValues

  textAlign?: TextAlignValues
  textTransform?: TextTransformValues
  textOverflow?: TextOverflowValues

  opacity?: OpacityValues
  opacityOverwrite?: OpacityValues

  transition?: TransitionCombinedValues
  willChange?: WillChangeValues
}

export const clsxElementStyles = (
  styleProps: ElementStyleProps
) => clsx(
  ...Object.entries(styleProps).map(([prop, value]) =>
    !!value && getPropStyle(prop, value)
  )
)

const getPropStyle = (
  prop: string,
  value: string
) => {
  let values: string[] = []
  if (prop === 'class') {
    return value
  }
  if (prop === 'padding') {
    values = value.split(' ')
    values[1] ??= values[0]
    values[2] ??= values[0]
    values[3] ??= values[1]
  }
  if (prop === 'transition') {
    values = value.split(' ')
  }
  if (values.length) {
    return values.map((value, index) =>
      getPropValueStyle(`${prop}${index}`, value)
    ).join(' ')
  }
  return getPropValueStyle(prop, value)
}

const getPropValueStyle = (
  prop: string,
  value: string
) => {
  if (prop === 'willChange') {
    value = value.replace(', ', '__')
  }
  if (value[value.length - 1] === '%') {
    value = value.replace('%', 'pct')
  }

  return elementStyles[`_${prop}_${value}`]
}
