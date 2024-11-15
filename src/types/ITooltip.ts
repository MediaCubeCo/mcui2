import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'

export interface ITooltip {
  content?: string
  size?: TooltipSizes
  placement?: TooltipPositions
  arrow?: boolean
  color?: string | undefined | null
  textColor?: string | undefined | null
}

export interface ITooltipStyles {
  top: number | null
  left: number | null
  translate: string
}

export interface ITooltipInstance extends ITooltip {
  target: HTMLElement
  id: number
  visible: boolean
  position: ITooltipStyles
  updateTooltipPosition: Function
  destroy: Function
  showTooltip: Function
  hideTooltip: Function
}

export type TooltipPositionsUnion = (typeof TooltipPositions)[keyof typeof TooltipPositions]
export type TooltipSizesUnion = (typeof TooltipSizes)[keyof typeof TooltipSizes]
