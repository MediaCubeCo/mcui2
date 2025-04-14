import { Router } from 'vue-router'
import { VueElement } from 'vue'
import { IToast } from '@/types/IToast'

export interface IDSOptions {
  drawerComponents?: Partial<VueElement>
  modalComponents?: Partial<VueElement>
  toasts?: Partial<IToast>
  defaultAvatar?: string | null,
  router?: null | Router
}