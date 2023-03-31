export const ungzip = async (buffer: ArrayBuffer) => {
  if (!(self as any).DecompressionStream) {
    const { inflate } = await import('pako/lib/inflate' /* webpackChunkName: 'polyfill.ungzip' */)
    return inflate(new Uint8Array(buffer)).buffer as ArrayBuffer
  }

  const ds: TransformStream<ArrayBuffer, ArrayBuffer> = new (self as any).DecompressionStream('gzip')
  const dsWriter = ds.writable.getWriter()
  dsWriter.write(buffer)
  dsWriter.close()

  return new Response(ds.readable).arrayBuffer()
}
