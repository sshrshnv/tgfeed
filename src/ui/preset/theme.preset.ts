import { createEffect } from 'solid-js'

import { useSettings } from '~/store'

const htmlEl = self.document.documentElement

export const hadleThemeChange = () => {
  const { settings } = useSettings()

  createEffect(() => {
    htmlEl.setAttribute('data-theme', settings.theme)
  })
}
