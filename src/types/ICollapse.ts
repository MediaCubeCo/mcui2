export interface ICollapse {
  isDisabled: boolean
  border: boolean
  icon: boolean
  id: string | number
  isCollapsed: boolean
  open: Function
  close: Function
  toggle: Function
}

export interface ICollapseEmitPayload {
  value: boolean
  component: ICollapse
}
