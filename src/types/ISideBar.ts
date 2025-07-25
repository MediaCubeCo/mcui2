import type { IconsListUnion } from '@/types/styles/Icons'
import type { ButtonVariationUnion } from '@/types/IButton'
import { SidebarTheme } from '@/enums'
import type { ColorTypes } from '@/types/styles/Colors'
import type { TitleVariationsUnion } from '@/types/ITitle'

export interface ISideBar {
  logoTitle: string
  logoTitleVariation: TitleVariationsUnion
  logoSrc: string
  logoIcon: IconsListUnion
  menuMainTitle: string
  menuMain: ISideBarMenuItem[]
  counts: Record<string, number | null>
  menuApps: ISideBarApp[]
  chatraConfig: ISideBarChatra
  hideText: string
  compact: boolean
  variable: SidebarTheme
  width: string
  compactWidth: string
  absoluteBreakpoint: number
  hiddenBreakpoint: number
}
export interface ISideBarChatra {
  title: string
  id: string
}
export interface ISideBarLang {
  name: 'en' | 'ru' | 'ar' | 'es' | 'pt' | string
  href: string
}
export interface ISideBarApp {
  name: string
  icon: IconsListUnion | string
  href: string
  isVisible?: boolean
  exact: boolean
  isActive: boolean
}
export interface ISideBarLink {
  name: string
  active: boolean,
  icon: IconsListUnion
  iconColor?: ColorTypes
  href: string
  to: string
  info?: string | number | null
  count_key: string
  classes?: object
}
export interface ISideBarMenuItem extends ISideBarLink {
  menu?: ISideBarLink[]
}
export interface ISideBarMenuItemEnrichment extends ISideBarMenuItem {
  id: number
  indicator: Function
  open: boolean
  child_active?: boolean
}

export interface ISidebarThemeConfig {
  mode: SidebarTheme
  className: string
  dropdownActivator: ButtonVariationUnion
  mainMenuLinks: {
    variable: ButtonVariationUnion
    secondaryColor: ColorTypes
  }
  closeButton: {
    variable: ButtonVariationUnion
    secondaryColor: ColorTypes
  }
}

export interface ISidebarThemeConfigProvide {
  currentThemeConfig: ISidebarThemeConfig
}
