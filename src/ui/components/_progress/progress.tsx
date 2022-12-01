import type { Component } from 'solid-js'
import { splitProps, Show } from 'solid-js'

import type { LinearProgressProps } from './linear-progress'
import { LinearProgress } from './linear-progress'
import type { CircularProgressProps } from './circular-progress'
import { CircularProgress } from './circular-progress'

type Props = (
  | (
    {
      linear: true
      circular?: never
    } & LinearProgressProps
  )
  | (
    {
      linear?: never
      circular: true
    } & CircularProgressProps
  )
)

export const Progress: Component<Props> = (_props) => {
  const [props, progressProps] = splitProps(_props, ['linear', 'circular'])

  return (
    <>
      <Show when={props.linear}>
        <LinearProgress {...(progressProps as LinearProgressProps)}/>
      </Show>
      <Show when={props.circular}>
        <CircularProgress {...(progressProps as CircularProgressProps)}/>
      </Show>
    </>
  )
}
