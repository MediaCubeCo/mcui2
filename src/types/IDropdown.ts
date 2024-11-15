import { DropdownListPositions, DropdownPositions } from '@/enums/Dropdown'

export interface IDropdown {}

export type DropdownListPositionsUnion = (typeof DropdownListPositions)[keyof typeof DropdownListPositions]
export type DropdownPositionsUnion = (typeof DropdownPositions)[keyof typeof DropdownPositions]