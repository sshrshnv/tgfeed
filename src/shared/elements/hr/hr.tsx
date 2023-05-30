import type { Component } from 'solid-js'

import hrCSS from './hr.sss'

export const HR: Component = () => {
  return (
    <hr class={hrCSS.base}/>
  )
}
