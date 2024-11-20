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
  default: string | number
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
  options: FilterOption[]
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

export type FilterOption = Record<string, string | number>
export type IRelationFilter = IRelationApiFilter | IRelationOptionsFilter

export type IFilter = IFastFilter | IRangeFilter | IRelationFilter | IBaseFilter

export interface IFilterBaseTag {
  id: string | number
  title: string
  description?: string
  category: string
  categoryName: string
  closable?: boolean
  type: FilterTypes
}

export interface IFilterRelationTag extends IFilterBaseTag {
  value: string | number
  relationKey: FilterRelations
}

export interface IFilterRangeTag extends IFilterBaseTag {
  value: IFilterRangeValue
  relationKey?: never
}
export interface IFilterDateTag extends IFilterBaseTag {
  value: IFilterDateValue
  relationKey?: never
}
export interface IFilterTextTag extends IFilterBaseTag {
  value: string | number
  relationKey?: never
}

export type IFilterTag = IFilterRelationTag | IFilterRangeTag | IFilterDateTag | IFilterTextTag

export type DateFilterValue = string | null
export type RangeFilterValue = string | number | null

// Range filter pair
export interface IFilterRangeValue {
  more: RangeFilterValue
  less: RangeFilterValue
}
export interface IFilterRangeName {
  more: RangeFilterValue
  less: RangeFilterValue
}

// Date filter pair
export interface IFilterDateValue {
  more: DateFilterValue
  less: DateFilterValue
}
export interface IFilterDateName {
  more: DateFilterValue
  less: DateFilterValue
}

// Relation filter pair
export type FilterRelationValue = {
  [FilterRelations.Exists]?: string | number | null
  [FilterRelations.Is]?: string[]
  [FilterRelations.IsNot]?: string[]
}
export type FilterRelationName = {
  [FilterRelations.Exists]?: string | null
  [FilterRelations.Is]?: Record<string, string>
  [FilterRelations.IsNot]?: Record<string, string>
}

// Text filter pair
export type FilterTextValue = string | number
export type FilterTextName = string | number

// Типы у которых есть more & less
export type FilterMoreLessConditionName = IFilterRangeName | IFilterDateName

// Filter condition types
export type FilterConditionValue = IFilterRangeValue | IFilterDateValue | FilterRelationValue | FilterTextValue
export type FilterConditionName = FilterMoreLessConditionName | FilterRelationName | FilterTextName


export type IFilterValueFilter = Record<string, FilterConditionValue>
export type IFilterValueFilterName = string

export type IFilterParsedValueFilter = Record<string, FilterConditionValue>
export type IFilterParsedValueFilterName = Record<string, FilterConditionName>

// Filter general value
export interface IFilterValue {
  filter: IFilterValueFilter
  filter_name: IFilterValueFilterName
}

// Filter general parsed value
export interface IFilterParsedValue {
  filter: IFilterParsedValueFilter
  filter_name: IFilterParsedValueFilterName
}

export interface IFilterPreset extends IFilterValue {
  name: string
}

export interface IFilterCondition {
  value: FilterConditionValue
  valueName?: FilterConditionName
}

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
