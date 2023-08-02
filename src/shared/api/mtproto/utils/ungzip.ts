//importScripts('compression-streams-polyfill/ponyfill')

export const ungzip = (buffer: ArrayBuffer, cb) => {
  const process = () => {
    const ds: TransformStream<ArrayBuffer, ArrayBuffer> = new self.DecompressionStream('gzip')
    const dsWriter = ds.writable.getWriter()
    dsWriter.write(buffer)
    dsWriter.close()
    new Response(ds.readable).arrayBuffer().then(res => cb(res))
  }

  if (!self.DecompressionStream) {
    /*import('compression-streams-polyfill/ponyfill' / webpackChunkName: 'compression.polyfill' /).then(({ makeDecompressionStream }) => {
      self.DecompressionStream = makeDecompressionStream(TransformStream)
      process()
    })
    return*/
  }
  process()
}

/*
if (!self.DecompressionStream) {
    const { makeDecompressionStream } = await import('compression-streams-polyfill/ponyfill' / webpackChunkName: 'compression.polyfill' /)
    self.DecompressionStream = makeDecompressionStream(TransformStream)
  }
  */
