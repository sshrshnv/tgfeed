import { createSignal } from 'solid-js'

export const createTransition = () => {
  const [isPending, setPending] = createSignal(false)
  const onStart = () => setPending(true)
  const onEnd = () => setPending(false)

  return {
    isPending,
    onStart,
    onEnd
  }
}
