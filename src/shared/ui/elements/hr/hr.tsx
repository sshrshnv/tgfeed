import type { Component } from 'solid-js'

import * as hrCSS from './hr.sss'

export const HR: Component = () => {
  return (
    <hr class={hrCSS.base}/>
  )
}
