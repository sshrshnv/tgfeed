import { imageDataRGB } from 'stackblur-canvas'

import { comlink } from '~/shared/utils/comlink'

import type { UI } from '../ui.types'

export const getBluredImageBytes: UI['getBluredImageBytes'] = (
  bytes, topX, topY, width, height, radius
) => {
  const imageClampedArray = new Uint8ClampedArray(bytes)
  const imageData = new ImageData(imageClampedArray, width, height)
  const bluredImageData = imageDataRGB(imageData, topX, topY, width, height, radius)
  return comlink.transfer(bluredImageData.data.buffer, [bluredImageData.data.buffer])
}
