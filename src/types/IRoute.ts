export interface IRouteWithName {
  name: string
  path?: never
}

export interface IRouteWithPath {
  path: string
  name?: never
}

export type IRoute = (IRouteWithName | IRouteWithPath) & {
  params?: { [key: string]: any }
  query?: { [key: string]: any }
}
