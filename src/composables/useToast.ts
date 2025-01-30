import { useRandomNumber } from '@/composables/useRandomNumber'
import { h, reactive, render, shallowRef, inject } from 'vue'
import ToastContainer from '@/components/templates/McToast/McToastContainer.vue'
import { ToastPositions } from '@/enums/Toast'
import { IDSOptions, IToast, IToastAction } from '@/types'

const toastDefaultOptions = {
  position: ToastPositions.BottomCenter,
  duration: 3000,
}

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

  constructor({ id, duration, position, variation= 'white', icon, title = '', description = '', closable, show_time, actions= [] as IToastAction[] }: Partial<IToast>) {
    this.id = id || useRandomNumber().timestamp(5)
    this.duration = duration || toastOptions.value.duration || toastDefaultOptions.duration
    this.position = position || toastOptions.value.position || toastDefaultOptions.position
    this.variation = variation
    this.icon = icon
    this.title = title
    this.description = description
    this.closable = closable || false
    this.show_time = show_time || false
    this.actions = actions
  }
  destroy = (): void => {
    reactiveProps.toasts = reactiveProps.toasts.filter(t => t.id !== this.id)
  }
}

function show(payload: Partial<IToast>) {
  //@ts-ignore
  const toast: IToast = new Toast(payload)

  reactiveProps.toasts.push(toast)
}

function info(payload: Partial<IToast>) {
  const icon = 'info'
  const variation = 'black'
  //@ts-ignore
  const toast: IToast = new Toast({ icon, variation, ...payload })

  reactiveProps.toasts.push(toast)
}

function hideAll() {
  reactiveProps.toasts.forEach(t => t.destroy())
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
  ensureToastContainerExists()

  const dsOptions = inject<IDSOptions>('dsOptions', {})
  if (dsOptions.toasts) {
    toastOptions.value = dsOptions.toasts
  }

  return {
    show,
    info,
    hideAll,
  }
}
