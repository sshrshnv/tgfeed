export type StreamParams = {
  fileUuid: string
  fileSize: number
  fileType: string
}

export type Service = {
  getStreamUrl: (
    params: StreamParams,
    loadStreamFilePart: (offset: number, limit: number) => Promise<string>
  ) => Promise<string>
}
