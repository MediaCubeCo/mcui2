import { ChipModifiers, ChipSize } from '@/enums/Chip'
import type { ColorTypes } from '@/types/styles/Colors'

export interface IChipStyleOptions {
  color: string
  variation: string
}

export type ChipSizeUnion = (typeof ChipSize)[keyof typeof ChipSize]
export type ChipVariationUnion =
  | ColorTypes
  | `${ColorTypes}-${ChipModifiers.Invert}`
  | `${ColorTypes}-${ChipModifiers.Outline}`
