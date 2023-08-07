import { getUiWorker } from '~/shared/ui/worker'

export const blurImage = ({
  canvasEl,
  src,
  width,
  height,
  radius
}: {
  canvasEl: HTMLCanvasElement
  src: string
  width: number
  height: number
  radius: number
}) => {
  const canvasContext = canvasEl?.getContext('2d')
  if (!canvasContext || !src) return

  const image = new Image()
  image.onload = async () => {
    const uiWorker = await getUiWorker()

    const bufferCanvas = self.document.createElement('canvas')
    const bufferCanvasContext = bufferCanvas.getContext('2d', { alpha: false })
    if (!bufferCanvasContext) return

    const imageParams: [number, number, number, number] = [0, 0, image.naturalWidth, image.naturalHeight]
    const canvasParams: [number, number, number, number] = [0, 0, width, height]
    bufferCanvasContext.drawImage(image, ...imageParams, ...canvasParams)

    const imageData = bufferCanvasContext.getImageData(...canvasParams)
    const bluredImageData = await uiWorker.getBluredImageData(imageData, ...canvasParams, radius)
    canvasContext.putImageData(bluredImageData, 0, 0)
  }
  image.src = src
}
