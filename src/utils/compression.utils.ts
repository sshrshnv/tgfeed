import { cacheModule } from '~/utils'

declare const DecompressionStream

export const ungzip = async (buffer: ArrayBuffer) => {
  if (!(self as any).DecompressionStream) {
    const { inflate } = await cacheModule(
      'pako/lib/inflate',
      () => import(/* webpackChunkName: 'polyfill' */ 'pako/lib/inflate')
    )
    return inflate(new Uint8Array(buffer)).buffer as ArrayBuffer
  }

  const ds: TransformStream<ArrayBuffer, ArrayBuffer> = new DecompressionStream('gzip')
  const dsWriter = ds.writable.getWriter()
  dsWriter.write(buffer)
  dsWriter.close()
  return new Response(ds.readable).arrayBuffer()
}
