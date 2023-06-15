export type Route = {
  type: 'page' | 'dialog' | 'popover'
  id: string
  path?: string
  [param: string]: string | number | boolean | null | undefined
}
