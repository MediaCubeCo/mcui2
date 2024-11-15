import { HorizontalAlignment } from '@/enums'
import { ModalVariation } from '@/enums/Modal'

export interface IModalServiceState {
  isOpen: boolean
  closeServiceState: Function
}

export interface IModalProps {
  name: string
  maxWidth: number
  duration: number
  closeVisible: boolean
  clickBackdropToClose: boolean
  arrowVisible: boolean
  scrollableContent: boolean
  separators: boolean
  headerAlign: HorizontalAlignment
  topPadding: boolean
  variation: ModalVariation
}

export interface IModalState {
  component: boolean
  componentName?: string
  componentProps?: object
  modelValue?: boolean
  id: string | number
  close: Function
}
