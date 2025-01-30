import { reactive, h, render, shallowRef, markRaw, inject } from 'vue'
import ModalContainer from '@/components/templates/McModal/McModalContainer.vue'
import type { IModalServiceState, IModalState } from '@/types/IModal'
import { IDSOptions } from '@/types'

const closeServiceState = () => {
  modalServiceState.isOpen = false
  reactiveProps.modals = []
}

const modalServiceState = reactive<IModalServiceState>({
  isOpen: false,
  closeServiceState: closeServiceState
})

const modalComponents = shallowRef({})
const reactiveProps = reactive<{ modals: IModalState[] }>({ modals: [] })

const createModalContainer = () => {
  const modalContainerElement = document.createElement('div')
  modalContainerElement.id = 'modal-container'
  document.body.appendChild(modalContainerElement)

  const vnode = h(ModalContainer, { modalServiceState, reactiveProps })
  render(vnode, modalContainerElement)
}

// Если компонент ModalContainer ещё не был добавлен в DOM, создаем его
const ensureModalContainerExists = () => {
  if (!document.getElementById('modal-container')) {
    createModalContainer()
  }
}

const showModal = (
  componentName: string, // Component name from modalComponents: {...}
  componentProps = {}
) => {
  //@ts-ignore
  if (!modalComponents.value[componentName]) {
    return console.warn(
      'The component is not provided in Mediacube-ui DS\n' +
        'Check and add to app.use(MediacubeUI, { modalComponents: {...} })'
    )
  }
  ensureModalContainerExists()

  const id = Date.now()
  const newModal: IModalState = {
    //@ts-ignore
    component: markRaw(modalComponents.value[componentName]),
    componentName: componentName,
    componentProps: componentProps,
    modelValue: true,
    id,
    close: () => {
      //@ts-ignore
      const modalToClose = reactiveProps.modals.findLast((d) => d.id === id)
      modalToClose && (modalToClose.modelValue = false)
      setTimeout(() => {
        reactiveProps.modals = reactiveProps.modals.filter((d) => d.id !== modalToClose?.id)
      }, 300)
    }
  }
  reactiveProps.modals.push(newModal)
  modalServiceState.isOpen = true
}

const closeModal = (componentName: string) => {
  //@ts-ignore
  const modalToClose = reactiveProps.modals.findLast((d) => d.componentName === componentName)
  modalToClose && modalToClose.close()
}

const closeAllModals = () => {
  reactiveProps.modals.forEach((d) => {
    d.close()
  })
}

export function useModal() {
  const dsOptions = inject<IDSOptions>('dsOptions', {})
  if (dsOptions.modalComponents) {
    modalComponents.value = dsOptions.modalComponents
  }

  return { showModal, closeModal, closeAllModals }
}
