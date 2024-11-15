import type { CellSizes } from '@/enums/Cell'

export interface ICell {}

export type CellSizesUnion = (typeof CellSizes)[keyof typeof CellSizes]
