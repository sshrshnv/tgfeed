export type Route = {
  type: 'page' | 'popup' | 'dropdown'
  params: Record<string, string | number | boolean | null | undefined>
}
