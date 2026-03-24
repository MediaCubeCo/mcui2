import { reactive, h, render, shallowRef, markRaw, inject, defineAsyncComponent, type Component } from 'vue'
import { getStoredAppContext } from '@/storedAppContext'
import type { IDrawerServiceState, IDrawerProps, IDrawerState } from '@/types/IDrawer'
import { IDSOptions } from '@/types/IDSOptions'
import { useHelper } from '@/composables/useHelper'

const helper = useHelper()
const componentCache = <Record<string, any>>{}
const drawerInstanceCache = <Record<string, any>>{}
let drawerInstanceSeq = 0

let DrawerContainerComponent: Component | null = null
let drawerContainerReady: Promise<void> | null = null

const drawerServiceState = reactive<IDrawerServiceState>({
  isOpen: false,
  activeDrawer: null,
  closeServiceState: () => {
    drawerServiceState.isOpen = false
    reactiveProps.drawers = []
  }
})

const drawerComponents = shallowRef<Record<string, any>>({})
const reactiveProps = reactive<{ drawers: IDrawerState[] }>({ drawers: [] })

const ASYNC_LOAD_ERROR_COMPONENT = { name: 'McDrawerAsyncError', render: () => null }

/**
 * Resolves component from any supported form:
 * - () => import('...') → Promise
 * - () => defineAsyncComponent(() => import('...')) → Component
 * - direct component object → use as-is
 */
const normalizeComponent = (comp: any) => {
  if (typeof comp !== 'function') return comp
  const cacheKey = comp.toString()
  if (componentCache[cacheKey]) return componentCache[cacheKey]
  componentCache[cacheKey] = defineAsyncComponent({
    loader: () => {
      const result = comp()
      if (result != null && typeof (result as Promise<unknown>).then === 'function') return result as Promise<Component>
      return Promise.resolve(result as Component)
    },
    errorComponent: ASYNC_LOAD_ERROR_COMPONENT,
    onError: (error: Error) => {
      console.error('[useDrawer] Failed to load drawer component', error)
    }
  })
  return componentCache[cacheKey]
}

const createDrawerContainer = async (): Promise<void> => {
  if (typeof window === 'undefined') return

  if (document.getElementById('drawer-container')) return

  if (!DrawerContainerComponent) {
    const mod = await import('@/components/templates/McDrawer/McDrawerContainer/McDrawerContainer.vue')
    DrawerContainerComponent = mod.default
  }

  const el = document.createElement('div')
  el.id = 'drawer-container'
  document.body.appendChild(el)

  const vnode = h(DrawerContainerComponent!, {
    drawerServiceState,
    reactiveProps
  })

  vnode.appContext = getStoredAppContext()
  render(vnode, el)
}

const ensureDrawerContainerExists = (): Promise<void> => {
  if (!getStoredAppContext()) return Promise.resolve()
  if (!drawerContainerReady) {
    drawerContainerReady = createDrawerContainer().catch((err) => {
      drawerContainerReady = null
      throw err
    })
  }
  return drawerContainerReady
}

const showDrawer = async (componentName: string, drawerProps: Partial<IDrawerProps> = {}, componentProps = {}) => {
  const compLoader = drawerComponents.value[componentName]

  if (!compLoader) {
    return console.warn(`Drawer component ${componentName} not registered`)
  }

  try {
    await ensureDrawerContainerExists()
  } catch (err) {
    console.error('[useDrawer] Failed to init drawer container', err)
    return
  }

  const component = markRaw(normalizeComponent(compLoader))

  const id = `${componentName}__${String(drawerInstanceSeq)}`

  const newDrawer: IDrawerState = {
    component,
    componentName,
    drawerProps,
    componentProps,
    modelValue: true,
    id,

    close: () => {
      const drawerToClose = helper.findLastSafe(reactiveProps.drawers, (d) => d.id === id)

      if (!drawerToClose) return

      drawerToClose.modelValue = false

      setTimeout(() => {
        reactiveProps.drawers = reactiveProps.drawers.filter((d) => d.id !== drawerToClose.id)

        drawerServiceState.activeDrawer = reactiveProps.drawers[reactiveProps.drawers.length - 1] || null
      }, drawerProps?.duration || 300)
    }
  }

  drawerInstanceCache[id] = newDrawer

  reactiveProps.drawers.push(newDrawer)

  drawerServiceState.isOpen = true
  drawerServiceState.activeDrawer = newDrawer
  drawerInstanceSeq++
}

const closeDrawer = (componentName: string) => {
  const drawerToClose = helper.findLastSafe(reactiveProps.drawers, (d) => d.componentName === componentName)
  drawerToClose?.close()
}

const closeAllDrawers = () => {
  reactiveProps.drawers.forEach((d) => d.close())
}

export function useDrawer() {
  const dsOptions = inject<IDSOptions>('dsOptions', {})

  if (dsOptions.drawerComponents) {
    drawerComponents.value = dsOptions.drawerComponents
  }

  return {
    showDrawer,
    closeDrawer,
    closeAllDrawers,
    drawerServiceState
  }
}
