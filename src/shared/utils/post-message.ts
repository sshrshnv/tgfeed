export function postMessage<T>(
  target: Worker | ServiceWorker,
  message: T,
  transfer?: Transferable[]
) {
  return transfer ?
    target.postMessage(message, transfer) :
    target.postMessage(message)
}
