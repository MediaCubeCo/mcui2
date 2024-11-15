import { type FilterRelations, type FilterTypes } from '@/enums/Filter'

export interface IBaseFilter {
  name: string
  value: string
  type: FilterTypes
  placeholder?: string
}

export interface IFastFilter extends IBaseFilter {
  type: FilterTypes.Fast
  relation: FilterRelations
  default: string | number | boolean
  description: string
}

export interface IRangeFilter extends IBaseFilter {
  type: FilterTypes.Range
  min: number
  max: number
}

export interface IRelationOptionsFilter extends IBaseFilter {
  type: FilterTypes.Relation
  is_text: boolean
  options: { name?: string; value?: string | number }[]
  getAjaxOne?: never
  getAjaxOptions?: never
}
export interface IRelationApiFilter extends IBaseFilter {
  type: FilterTypes.Relation
  is_text: boolean
  options?: never
  getAjaxOne: Function
  getAjaxOptions: Function
}

export type IRelationFilter = IRelationApiFilter | IRelationOptionsFilter

export type IFilter = IFastFilter | IRangeFilter | IRelationFilter | IBaseFilter

export interface IFilterTag extends IBaseFilter {
  id?: string | number
  title: string
  category?: string
  categoryName: string
  relationKey?: string
}
export interface IFilterChip {
  id?: string | number
  value: string | number
  title: string
  category?: string
  categoryName: string
  relationKey?: string
}

export interface IFilterValue {
  filter: { [key: string]: FilterConditionValue } | null
  filter_name: FilterConditionName
}

export interface IFilterPreset extends IFilterValue {
  name: string
}

export interface IFilterDateValue {
  more: string | null
  less: string | null
}
export interface IFilterRangeValue {
  more: string | number | null
  less: string | number | null
}

export interface IFilterCondition {
  value: FilterConditionValue,
  valueName?: FilterConditionName
}

export type FilterRelationValue = {
  [key in FilterRelations | string]: string[] | object | string
}

export type FilterConditionValue = IFilterRangeValue | IFilterDateValue | FilterRelationValue | object | null | string | number | boolean
export type FilterConditionName = FilterRelationValue | string | null

export interface IFilterDragOptions {
  scrollPos: number
  startClientPos: number
  distance: number
  isDrag: boolean
  mouseIsDown: boolean
}

export type FilterRelationsUnion = (typeof FilterRelations)[keyof typeof FilterRelations]


export interface IFilterPlaceholders {
  main_tooltip: string
  value: string
  condition: string
  create_preset: string
  fast_filters: string
  added_filters: string
  enter_preset_name: string
  enter_preset_tooltip: string
  from: string
  to: string
  enter: string
  choose: string
  actions: {
    add: string
    save: string
    clear: string
    create: string
    delete_preset: string
    is: string
    is_not: string
    empty: string
    confirm: string
  }
  calendar: {
    week: string
    month: string
    quarter: string
    year: string
    confirm: string
  }
  messages: {
    same_filter: string
    same_preset_name: string
    accidentally_cleared: string
    accidentally_deleted: string
    more_than: string
  }
}