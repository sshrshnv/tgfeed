/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import type { ParentComponent, ComponentProps, Setter } from 'solid-js'
import { splitProps, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as dialogCSS from './dialog.sss'

export type DialogProps = ComponentProps<'dialog'> & {
  closing?: boolean
  modal?: boolean
  onCancel: () => void
}

export const Dialog: ParentComponent<DialogProps> = (_props) => {
  const [props, dialogProps] = splitProps(_props, [
    'ref', 'open', 'closing', 'class', 'modal', 'onCancel'
  ])

  let dialogEl: HTMLDialogElement

  const dialogRef = (el: HTMLDialogElement) => {
    dialogEl = el
    if (typeof props.ref !== 'function') return
    props.ref(el)
  }

  const handleClick = (ev) => {
    if (ev.target.nodeName.toLowerCase() !== 'dialog') return
    props.onCancel()
  }

  const handleCancel = (ev) => {
    ev.preventDefault()
    props.onCancel()
  }

  createEffect((prev) => {
    if (!prev && props.open && !dialogEl.open) {
      props.modal ? dialogEl.showModal() : dialogEl.show()
    }
    if (prev && !props.open && dialogEl.open) {
      dialogEl.close()
    }

    return props.open
  })

  return (
    <dialog {...dialogProps}
      class={clsx(
        props.class,
        props.open && dialogCSS._open,
        props.closing && dialogCSS._closing,
        dialogCSS.base,
        layoutCSS.before,
      )}
      ref={dialogRef as Setter<HTMLDialogElement>}
      onClick={handleClick}
      onCancel={handleCancel}
    />
  )
}
