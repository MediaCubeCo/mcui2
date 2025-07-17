import { Router } from 'vue-router'
import { VueElement } from 'vue'
import { IToast } from '@/types/IToast'
import { Themes } from '@/enums'
import { ColorThemes } from '@/types'

export interface IDSOptions {
  drawerComponents?: Partial<VueElement>
  modalComponents?: Partial<VueElement>
  toasts?: Partial<IToast>
  defaultAvatar?: string | null,
  colors?: Record<string, string>,
  themes?: ColorThemes,
  theme?: Themes,
  meta?: {
    router?: null | Router,
    isServer?: boolean
  }
}