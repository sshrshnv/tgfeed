export type Route = {
  type: 'page' | 'popup' | 'abstract'
  id: string
  path?: string
  [param: string]: string | number | boolean | null | undefined
}
