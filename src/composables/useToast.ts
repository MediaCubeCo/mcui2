import { useRandomNumber } from '@/composables/useRandomNumber'
import { h, reactive, render, shallowRef, inject, ref } from 'vue'
import ToastContainer from '@/components/templates/McToast/McToastContainer.vue'
import { ToastPositions } from '@/enums/Toast'
import { ColorTypes, IDSOptions, IToast, IToastAction } from '@/types'
import { useTheme } from './useTheme'

const toastDefaultOptions = {
  position: ToastPositions.BottomCenter,
  duration: 3000
}

const theme = ref({})
const toastOptions = shallowRef<Partial<IToast>>({
  duration: toastDefaultOptions.duration,
  position: toastDefaultOptions.position,
})
const reactiveProps = reactive<Record<'toasts', IToast[]>>({
  toasts: []
})

class Toast {
  id: number
  duration: number
  position: string
  variation: string
  icon: string | undefined
  title: string
  description: string
  closable: boolean
  show_time: boolean
  actions: IToastAction[] | []
  onClose?: Function
  onTimeEnd?: Function

  constructor({
    id,
    duration,
    position,
    variation = '' as ColorTypes,
    icon,
    title = '',
    description = '',
    closable,
    show_time,
    actions = [] as IToastAction[],
    onClose,
    onTimeEnd
  }: Partial<IToast>) {
    this.id = id || useRandomNumber().timestamp(5)
    this.duration = duration || toastOptions.value.duration || toastDefaultOptions.duration
    this.position = position || toastOptions.value.position || toastDefaultOptions.position
    this.variation = variation!
    this.icon = icon
    this.title = title
    this.description = description
    this.closable = closable || false
    this.show_time = show_time || false
    this.actions = actions
    this.onClose = onClose
    this.onTimeEnd = onTimeEnd
  }
  destroy = (): void => {
    reactiveProps.toasts = reactiveProps.toasts.filter((t) => t.id !== this.id)
  }
  close = () => {
    this.destroy()
    this.onClose?.()
  }
  timeEnd = () => {
    this.destroy()
    this.onTimeEnd?.()
  }
}

function show(payload: Partial<IToast>) {
  ensureToastContainerExists()
  //@ts-ignore
  const variation = theme.value.component.variation
  //@ts-ignore
  const toast: IToast = new Toast({ variation, ...payload })

  reactiveProps.toasts.push(toast)

  return toast
}

function info(payload: Partial<IToast>) {
  ensureToastContainerExists()
  const icon = 'info'
  const variation = 'black'
  //@ts-ignore
  const toast: IToast = new Toast({ icon, variation, ...payload })

  reactiveProps.toasts.push(toast)

  return toast
}

function hideAll() {
  reactiveProps.toasts.forEach((t) => t.destroy())
}

const createToastContainer = () => {
  const modalContainerElement = document.createElement('div')
  modalContainerElement.id = 'toast-container'
  document.body.appendChild(modalContainerElement)

  const vnode = h(ToastContainer, { reactiveProps })
  render(vnode, modalContainerElement)
}

const ensureToastContainerExists = () => {
  if (!document.getElementById('toast-container')) {
    createToastContainer()
  }
}

export function useToast() {
  const dsOptions = inject<IDSOptions>('dsOptions', {})
  theme.value = useTheme('toast')
  if (dsOptions.toasts) {
    toastOptions.value = dsOptions.toasts
  }

  return {
    show,
    info,
    hideAll
  }
}
