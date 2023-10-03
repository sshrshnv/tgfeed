import type { Component } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { MenuTitle, MenuRadioGroup } from '~/shared/ui/elements/menu'

import type { FontSize } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'

type FontSizeItem = {
  value: FontSize
  text?: string
}

export const FeedMenuFontSize: Component = () => {
  const getItems = (): FontSizeItem[] => [
    { value: 'large', text: localeState.texts?.feed.fontSize.large },
    { value: 'medium', text: localeState.texts?.feed.fontSize.medium },
    { value: 'small', text: localeState.texts?.feed.fontSize.small }
  ]

  const handleChange = (value: FontSize) => {
    setFeedState('fontSize', value)
  }

  return (
    <>
      <MenuTitle
        text={localeState.texts?.feed.fontSize.title}
      />
      <MenuRadioGroup
        value={feedState.fontSize}
        name='fontSize'
        items={getItems()}
        onChange={handleChange}
      />
    </>
  )
}
