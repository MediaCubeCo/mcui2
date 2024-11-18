import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { IconsListUnion } from '@/types/styles/Icons'

export type SortDirection = null | 'asc' | 'desc'

export interface ITableColumnBase {
  header: string | number
  field: string
  total?: number
  sortable?: boolean
  align?: HorizontalAlignmentUnion
}

export interface ITableColumnWidth extends ITableColumnBase {
  width: number
  minWidth?: never
}
export interface ITableColumnMinWidth extends ITableColumnBase {
  minWidth: number
  width?: never
}

export type ITableColumn = ITableColumnWidth | ITableColumnMinWidth

export type ITableColumnEnriched = ITableColumn & {
  fixedFirst: boolean
  fixedLast: boolean
  style?: { [key: string]: undefined | string | number }
  class?: { [key: string]: boolean }
}

export type ITableTotals<T extends ITableColumnBase> = {
  [key in T['field']]?: string | number
}

export type ITableData = any[]

export interface ITableSort {
  sort_column: string
  sort_direction: SortDirection
}
export interface ITableSortState {
  direction: SortDirection
  next_direction: SortDirection
  icon: IconsListUnion
}

export interface ITablePlaceholders {
  no_data: string
  loading: string
  all_loaded: string
  total: string
}

export interface ITableCardProps {
  id?: string | number
  tableColumns: ITableColumn[]
  tableData: ITableData
  tableTotals: ITableTotals<ITableColumn>
  tableSort: ITableSort
  tableHeaderRowHeight: number
  tableFooterRowHeight: number
  tableFixedFirstColumn: boolean
  tableCardProps: Record<any, any>
  footerBlur?: boolean
}

export interface ITableCardOpenState {
  state: true
  id: string | number | undefined
}
export interface ITableCardCloseState {
  state: false
  id?: never
}
export type TableCardState = ITableCardOpenState | ITableCardCloseState
