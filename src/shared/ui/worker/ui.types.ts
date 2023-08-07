export type UI = {
  getImageUrlFromBytes: (
    bytes: ArrayBuffer,
    params?: {
      stripped?: boolean
    }
  ) => Promise<string>

  getBluredImageData: (
    data: ImageData,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ) => Promise<ImageData>
}

export type UIWorkerMessage = {
  mainPort: MessagePort
}
