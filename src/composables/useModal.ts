import { reactive, h, render, shallowRef, markRaw, inject, defineAsyncComponent } from 'vue'

import ModalContainer from '@/components/templates/McModal/McModalContainer.vue'
import { getStoredAppContext } from '@/storedAppContext'
import type { IModalServiceState, IModalState } from '@/types/IModal'
import { IDSOptions } from '@/types/IDSOptions'
import { useHelper } from '@/composables/useHelper'

const helper = useHelper()

const componentCache: Record<string, any> = {}
const modalInstanceCache: Record<string, any> = {}

const modalServiceState = reactive<IModalServiceState>({
  isOpen: false,
  activeModal: null,
  closeServiceState: () => {
    modalServiceState.isOpen = false
    reactiveProps.modals = []
  }
})

const modalComponents = shallowRef<Record<string, any>>({})
const reactiveProps = reactive<{ modals: IModalState[] }>({ modals: [] })

const ASYNC_LOAD_ERROR_COMPONENT = { name: 'McModalAsyncError', render: () => null }

/**
 * Resolves component from any supported form:
 * - () => import('...') → Promise
 * - () => defineAsyncComponent(() => import('...')) → Component
 * - direct component object → use as-is
 */
const normalizeComponent = (comp: any) => {
  if (!comp) return comp

  const compKey = comp.toString()

  if (componentCache[compKey]) return componentCache[compKey]

  let resolved = comp

  if (typeof comp === 'function') {
    resolved = defineAsyncComponent({
      loader: () => {
        const result = comp()
        if (result != null && typeof (result as Promise<unknown>).then === 'function') return result as Promise<any>
        return Promise.resolve(result)
      },
      timeout: 10000,
      suspensible: false,
      errorComponent: ASYNC_LOAD_ERROR_COMPONENT,
      onError: (error: Error) => {
        console.error('[useModal] Failed to load modal component', error)
      }
    })
  }

  componentCache[compKey] = resolved
  return resolved
}

const createModalContainer = () => {
  if (typeof window === 'undefined') return

  if (document.getElementById('modal-container')) return

  const el = document.createElement('div')
  el.id = 'modal-container'
  document.body.appendChild(el)

  const vnode = h(ModalContainer, {
    modalServiceState,
    reactiveProps
  })

  vnode.appContext = getStoredAppContext()
  render(vnode, el)
}

const ensureModalContainerExists = () => {
  if (getStoredAppContext()) createModalContainer()
}

const showModal = (componentName: string, componentProps: any = {}) => {
  const loader = modalComponents.value[componentName]

  if (!loader) {
    return console.warn(`Modal ${componentName} not registered`)
  }

  ensureModalContainerExists()

  const existing = helper.findLastSafe(reactiveProps.modals, (m) => m.componentName === componentName)

  if (existing) {
    existing.modelValue = true
    modalServiceState.activeModal = existing
    return
  }

  const component = markRaw(normalizeComponent(loader))

  const id = componentName

  const modal: IModalState = {
    component,
    componentName,
    componentProps,
    modelValue: true,
    id,

    close: () => {
      const modalToClose =
        helper.findLastSafe(reactiveProps.modals, (m) => m.id === id) ||
        reactiveProps.modals[reactiveProps.modals.length - 1]

      if (!modalToClose) return

      modalToClose.modelValue = false

      setTimeout(() => {
        reactiveProps.modals = reactiveProps.modals.filter((m) => m.id !== modalToClose.id)
        modalServiceState.activeModal = reactiveProps.modals[reactiveProps.modals.length - 1] || null
      }, 300)
    }
  }

  modalInstanceCache[id] = modal

  reactiveProps.modals.push(modal)

  modalServiceState.isOpen = true
  modalServiceState.activeModal = modal
}

const closeModal = (componentName: string) => {
  const modal =
    helper.findLastSafe(reactiveProps.modals, (m) => m.componentName === componentName) ||
    reactiveProps.modals[reactiveProps.modals.length - 1]

  modal?.close()
}

const closeAllModals = () => {
  reactiveProps.modals.forEach((m) => m.close())
}

export function useModal() {
  const dsOptions = inject<IDSOptions>('dsOptions', {})

  if (dsOptions.modalComponents) {
    modalComponents.value = dsOptions.modalComponents
  }

  return {
    showModal,
    closeModal,
    closeAllModals
  }
}
