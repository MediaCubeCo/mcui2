import type { IRoute } from '@/types/IRoute'
import type { ColorTypes } from '@/types/styles/Colors'
import { type IconsListUnion } from '@/types/styles/Icons'
import { TabVariations } from '@/enums/Tab'

export interface ITab {
  isActive: boolean
  isVisible: boolean
  computedId: string
  hash: string
  hasAppendCount: boolean
  appendCountStyles: string
  header: string
  href?: string
  to?: string
  id: string
  name: string
  iconAppendColor: ColorTypes
  iconPrependColor: ColorTypes
  iconAppend: IconsListUnion
  iconPrepend: IconsListUnion
  visible: boolean
  isDisabled: boolean
  appendCountColor: string | ColorTypes
  appendCount: string | number
  suffix: string
  prefix: string
  hideTab: Function
  showTab: Function
  onClick: Function | unknown
}

export type TabVariationUnion = (typeof TabVariations)[keyof typeof TabVariations]
