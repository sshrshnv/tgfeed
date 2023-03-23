import type { Accessor } from 'solid-js'
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { State } from '~/core/state'



export const loadLocaleTexts = (
  getLocaleLang: Accessor<State['localeLang']>,
  localeTextsKey: keyof State['localeTexts']
) => {
  createEffect(() => {
    import(
      /* webpackChunkName: 'locale.' */
      /* webpackPreload: true */
      `~/locales/${getLocaleLang()}/texts/${localeTextsKey}.json`
    )
  })
}
