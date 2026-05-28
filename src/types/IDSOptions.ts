import { VueElement } from 'vue'
import { IToast } from '@/types/IToast'
import { Themes } from '@/enums/Themes'
import { ColorThemes } from '@/types/styles/ColorTheme'
import { ITranslations } from '@/types/ITranslations'

export interface IDSOptions {
  drawerComponents?: Partial<VueElement>
  modalComponents?: Partial<VueElement>
  toasts?: Partial<IToast>
  defaultAvatar?: string | null,
  colors?: Record<string, string>,
  themes?: ColorThemes,
  theme?: Themes,
  meta?: {
    router_push?: null | Function,
  }
  componentTranslations?: ITranslations,
}