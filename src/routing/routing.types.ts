export type Route =
| ({
  path?: string
  pageId: string
  pageParams?: Record<string, string>
} & Pick<EmptyRoute, 'popupId'|'dropdown'>)
| ({
  popupId: string
} & Omit<EmptyRoute, 'popupId'>)
| ({
  dropdown: true
} & Omit<EmptyRoute, 'dropdown'>)

export type Routes = {
  [K in string]: | Route | ((...params) => Route)
}
