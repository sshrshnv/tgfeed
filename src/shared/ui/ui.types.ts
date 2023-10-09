import type { InputFileLocation } from '~/shared/api/mtproto'

export type UI = {
  check: () => Promise<boolean>

  getThumbUrlFromBytes: (
    bytes: ArrayBuffer,
    params?: {
      stripped?: boolean
    }
  ) => Promise<string>

  getBluredImageBytes: (
    bytes: ArrayBuffer,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ) => Promise<ArrayBuffer>

  getMediaUrlFromFile: (
    file: {
      location: InputFileLocation
      type: string
      limit: number
      partsCount: number
    }
  ) => Promise<string | undefined>
}

export type UIWorkerMessage = {
  mainPort: MessagePort
}
