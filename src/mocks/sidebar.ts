import { SidebarTheme } from '@/enums/Sidebar'
import type { ISideBarApp, ISideBarLang, ISideBarMenuItem, ISidebarThemeConfig } from '@/types/ISideBar'

const apps = [
  {
    name: "Dashboard",
    icon: "mc_dashboard",
    href: "javascript:void(0);",
    exact: true,
    isActive: true,
  },
  {
    name: "McPay",
    icon: "mc_pay_app",
    href: "javascript:void(0);",
    exact: true,
    isActive: false,
  },
  {
    name: "Assist",
    icon: "mc_assist",
    href: "javascript:void(0);",
    exact: true,
    isActive: false,
  },
] as ISideBarApp[]

const langs = [
  {
    name: 'Ru',
    href: 'javascript:void(0);',
  },
  {
    name: 'En',
    href: 'javascript:void(0);',
  },
  {
    name: 'Es',
    href: 'javascript:void(0);',
  },
  {
    name: 'Pt',
    href: 'javascript:void(0);',
  },
] as ISideBarLang[]

const menu = [
  {
    name: 'Users',
    icon: 'group',
    info: '232',
    menu: [
      {
        name: 'Сеть',
        to: `payment-accounts-partners-network-index`,
      },
      {
        name: 'Доходы',
        icon: 'assessment',
        to: `payment-accounts-partners-revenues-index`,
      },
      {
        name: 'Объекты',
        icon: 'subscriptions',
        to: `payment-accounts-partners-assets-index`,
        active: true,
      },
    ],
  },
  {
    name: 'Roles',
    icon: 'role',
    count_key: 'roles',
    info: '231',
  },
  {
    name: 'Transactions',
    icon: 'swap_horizontal_circle',
  },
  {
    name: 'Transfers',
    icon: 'dollar',
    iconColor: 'red',
    info: '232',
  },
  {
    name: 'Report',
    icon: 'download',
    iconColor: 'green',
  },
  {
    name: 'Google',
    href: 'https://google.com',
  },
] as ISideBarMenuItem[]

const defaultThemes = {
  [SidebarTheme.Black]: {
    mode: SidebarTheme.Black,
    className: 'mc-side-bar--color-theme-black',
    dropdownActivator: 'white',
    mainMenuLinks: {
      variable: 'gray-flat',
      secondaryColor: 'white',
    },
    closeButton: {
      variable: 'gray-link',
      secondaryColor: 'white',
    },
  } as ISidebarThemeConfig,
  [SidebarTheme.White]: {
    mode: SidebarTheme.White,
    className: 'mc-side-bar--color-theme-white',
    dropdownActivator: 'black',
    mainMenuLinks: {
      variable: 'black-flat',
      secondaryColor: 'purple',
    },
    closeButton: {
      variable: 'black-link',
      secondaryColor: 'purple',
    },
  } as ISidebarThemeConfig
}

export { apps, langs, menu, defaultThemes }
