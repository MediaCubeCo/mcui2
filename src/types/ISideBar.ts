import type { IconsListUnion } from '@/types/styles/Icons'
import type { ButtonVariationUnion } from '@/types/IButton'
import { SidebarTheme } from '@/enums'
import type { ColorsUnion, ColorTypes } from '@/types/styles/Colors'
import type { TitleVariationsUnion } from '@/types/ITitle'
import type { IRoute } from '@/types/IRoute'

export interface ISideBar {
  logoTitle: string
  logoTitleVariation: TitleVariationsUnion
  logoSrc: string
  logoIcon: IconsListUnion
  menuMainTitle: string
  menuMain: ISideBarMenuItem[]
  counts: Record<string, number | null>
  menuApps: ISideBarApp[]
  chatraConfig: object
  hideText: string
  compact: boolean
  variable: SidebarTheme
  width: string
  compactWidth: string
  absoluteBreakpoint: number
  hiddenBreakpoint: number
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
  icon: IconsListUnion
  iconColor?: ColorTypes
  href: string
  to: IRoute
  info?: string | number | null
  count_key: string
}
export interface ISideBarMenuItem extends ISideBarLink {
  menu?: ISideBarLink[]
}
export interface ISideBarMenuItemEnrichment extends ISideBarMenuItem {
  id: number
  active: Function,
  indicator: Function
  open: boolean
}

export interface ISidebarThemeConfig {
  mode: SidebarTheme
  className: string
  dropdownActivator: ButtonVariationUnion
  mainMenuLinks: {
    variable: ButtonVariationUnion
    secondaryColor: ColorsUnion
  }
  closeButton: {
    variable: ButtonVariationUnion
    secondaryColor: ColorsUnion
  }
}

export interface ISidebarThemeConfigProvide {
  currentThemeConfig: ISidebarThemeConfig
}
