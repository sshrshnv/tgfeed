import type { Component } from 'solid-js'
import { lazy, Suspense } from 'solid-js'

import { loadIntroModule } from '../intro.module'

const COMPONENT_PATH = './intro-content'

const IntroContent = lazy(async () => {
  const [component] = await loadIntroModule(
    COMPONENT_PATH,
    () => import(`${COMPONENT_PATH}`)
  )
  return component
})

export const IntroPage: Component = () => {
  return (
    <>
      <Suspense>
        <IntroContent/>
      </Suspense>
    </>
  )
}
