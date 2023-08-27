export type UI = {
  getThumbUrlFromBytes: (
    bytes: ArrayBuffer,
    params?: {
      stripped?: boolean
    }
  ) => string | Promise<string>

  getBluredImageBytes: (
    bytes: ArrayBuffer,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ) => ArrayBuffer | Promise<ArrayBuffer>

  getMediaUrlFromFile: (
    file: {
      fileUuid: string
      type: string
      partsCount: number
    }
  ) => string | undefined | Promise<string | undefined>
}

export type UIWorkerMessage = {
  mainPort: MessagePort
}
