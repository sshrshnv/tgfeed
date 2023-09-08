export type StreamParams = {
  fileUuid: string
  fileSize: number
  fileType: string
}

export type Service = {
  handleStreams: (
    loadStreamFilePart: (
      uuid: string,
      offset: number,
      limit: number
    ) => void
  ) => Promise<void>

  handleStreamFilePartLoad: (
    filePartUuid: string,
    uuid: string,
    offset: number,
    limit: number
  ) => void
}
