import { ColumnAlignment, ColumnJustifyAlignment } from '@/enums/Grid'

export type ColumnSpanUnion =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
export type ColumnJustifyAlignmentUnion =
  (typeof ColumnJustifyAlignment)[keyof typeof ColumnJustifyAlignment]
export type ColumnAlignmentUnion = (typeof ColumnAlignment)[keyof typeof ColumnAlignment]
