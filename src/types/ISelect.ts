import { SelectGroupKeys, SelectListDirections } from '@/enums/Select'

export interface ISelectOption {
  name?: string
  value?: string | number
  text?: string
  icon?: string
  is_closable?: boolean
  [key: string]: any;
}

export interface ISelectGroupOption {
  [SelectGroupKeys.Label]: string
  [SelectGroupKeys.Values]: ISelectOption[]
}

export type ISelectOptions = ISelectOption[]
export type ISelectGroupOptions = ISelectGroupOption[]
export type SelectListDirectionsUnion =
  (typeof SelectListDirections)[keyof typeof SelectListDirections]
