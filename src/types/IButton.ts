import { ButtonModifiers, ButtonSize, ButtonType } from '@/enums/ui/Button'
import type { ColorsUnion, ColorTypes } from '@/types/styles/Colors'
import type { IRoute } from '@/types/IRoute'
import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { WeightsUnion } from '@/types/styles/Weights'
import type { TooltipPositionsUnion } from '@/types/ITooltip'

export interface IButton {
  to?: IRoute
  href?: string
  nuxt?: boolean
  disabled?: boolean
  inactive?: boolean
  loading?: boolean
  iconLoading?: boolean
  type?: ButtonTypeUnion
  variation?: ButtonVariationUnion
  size?: ButtonSizeUnion
  shadow?: boolean
  rounded?: boolean
  semiRounded?: boolean
  textAlign?: HorizontalAlignmentUnion
  fullWidth?: boolean
  isActive?: boolean
  exact?: boolean
  uppercase?: boolean
  defaultTag?: string
  secondaryColor?: ColorsUnion
  underlineLink?: boolean
  bgFlat?: boolean
  weight?: WeightsUnion
  tooltip?: string
  tooltipPlacement?: TooltipPositionsUnion
  tabindex?: string | number
}

export interface IButtonStyleOptions {
  color: string
  type: string
}

export type ButtonTypeUnion = (typeof ButtonType)[keyof typeof ButtonType]
export type ButtonSizeUnion = (typeof ButtonSize)[keyof typeof ButtonSize]
export type ButtonVariationUnion =
  | ColorTypes
  | `${ColorTypes}-${ButtonModifiers.Link}`
  | `${ColorTypes}-${ButtonModifiers.Flat}`
  | `${ColorTypes}-${ButtonModifiers.Outline}`
  | `${ColorTypes}-${ButtonModifiers.Invert}`
