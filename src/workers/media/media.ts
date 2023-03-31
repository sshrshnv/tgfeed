export const initMediaWorker = () => {
  const worker = new Worker(new URL('./worker/media.worker', import.meta.url))
  return worker
}
