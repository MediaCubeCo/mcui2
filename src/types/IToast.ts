import { ToastPositions } from '@/enums/Toast'
import { ColorTypes } from '@/types/styles/Colors'
import { IconsListUnion } from '@/types/styles/Icons'
import { ButtonVariationUnion } from '@/types/IButton'

export interface IToast {
  id?: number
  duration?: number
  position: ToastPositions
  variation?: ColorTypes
  icon?: IconsListUnion
  title: string
  description: string
  closable?: boolean
  show_time?: boolean
  actions?: IToastAction[],
  destroy: Function
  close: Function
  onClose?: Function
  timeEnd: Function
  onTimeEnd?: Function
  toast: IToast
}

export interface IToastAction {
  title: string
  handler: Function
  variation?: ButtonVariationUnion
  icon?: IconsListUnion
}

export type ToastPositionsUnion = (typeof ToastPositions)[keyof typeof ToastPositions]
