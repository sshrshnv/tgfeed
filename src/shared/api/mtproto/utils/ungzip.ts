export const ungzip = async (buffer: ArrayBuffer) => {
  if (!self.DecompressionStream) {
    const { makeDecompressionStream } = await import('compression-streams-polyfill/ponyfill' /* webpackChunkName: 'compression.polyfill' */)
    self.DecompressionStream = makeDecompressionStream(TransformStream)
  }

  const ds: TransformStream<ArrayBuffer, ArrayBuffer> = new self.DecompressionStream('gzip')
  const dsWriter = ds.writable.getWriter()
  dsWriter.write(buffer)
  dsWriter.close()

  return new Response(ds.readable).arrayBuffer()
}
