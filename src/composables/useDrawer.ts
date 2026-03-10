import { reactive, h, render, shallowRef, markRaw, inject, defineAsyncComponent, type Component } from 'vue'
import { getStoredAppContext } from '@/storedAppContext'
import type { IDrawerServiceState, IDrawerProps, IDrawerState } from '@/types/IDrawer'
import { IDSOptions } from '@/types/IDSOptions'
import { useHelper } from '@/composables/useHelper'

const helper = useHelper()
const componentCache = <Record<string, any>>{}
const drawerInstanceCache = <Record<string, any>>{}

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

const normalizeComponent = (comp: any) => {
  if (typeof comp === 'function') {
    if (!componentCache[comp.toString()]) {
      componentCache[comp.toString()] = defineAsyncComponent(comp)
    }
    return componentCache[comp.toString()]
  }
  return comp
}

const createDrawerContainer = async (): Promise<void> => {
  if (typeof window === 'undefined') return

  if (document.getElementById('drawer-container')) return

  if (!DrawerContainerComponent) {
    const mod = await import('@/components/templates/McDrawer/McDrawerContainer.vue')
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
    drawerContainerReady = createDrawerContainer()
  }
  return drawerContainerReady
}

const showDrawer = async (componentName: string, drawerProps: Partial<IDrawerProps> = {}, componentProps = {}) => {
  const compLoader = drawerComponents.value[componentName]

  if (!compLoader) {
    return console.warn(`Drawer component ${componentName} not registered`)
  }

  await ensureDrawerContainerExists()

  const existing = helper.findLastSafe(reactiveProps.drawers, (d) => d.componentName === componentName)

  if (existing) {
    existing.modelValue = true
    drawerServiceState.activeDrawer = existing
    return
  }

  const component = markRaw(normalizeComponent(compLoader))

  const id = componentName

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
