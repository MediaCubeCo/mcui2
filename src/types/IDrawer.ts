import type { IconsListUnion } from '@/types/styles/Icons'
import { DrawerPositions } from '@/enums/Drawer'

export interface IDrawerServiceState {
  isOpen: boolean
  activeDrawer: IDrawerState | null
  closeServiceState: Function
}

export interface IDrawerProps {
  duration?: number
  width?: number
  position?: DrawerPositionsUnion
  title?: string
  titleEllipsis?: boolean
  closeVisible?: boolean
  iconClose?: IconsListUnion
  showOverlay?: boolean
}

export interface IDrawerState {
  component: boolean
  drawerProps?: IDrawerProps
  componentName?: string
  componentProps?: object
  modelValue?: boolean
  id: string | number
  close: Function
}

export type DrawerPositionsUnion = (typeof DrawerPositions)[keyof typeof DrawerPositions]
