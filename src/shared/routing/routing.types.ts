export type Route = {
  type: 'page' | 'dialog' | 'popover' | 'state'
  id: string
  path?: string
  [param: string]: string | number | boolean | null | undefined
}
