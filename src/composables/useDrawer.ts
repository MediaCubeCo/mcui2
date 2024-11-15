import { reactive, ref, h, render, getCurrentInstance, shallowRef, markRaw } from 'vue'
import DrawerContainer from '@/components/templates/McDrawer/McDrawerContainer.vue'
import type { IDrawerServiceState, IDrawerProps, IDrawerState } from '@/types/IDrawer'

const closeServiceState = () => {
  drawerServiceState.isOpen = false
  reactiveProps.drawers = []
}

const drawerServiceState = reactive<IDrawerServiceState>({
  isOpen: false,
  closeServiceState: closeServiceState
})

const drawerComponents = shallowRef({})
const reactiveProps = reactive<{ drawers: IDrawerState[] }>({ drawers: [] })

const createDrawerContainer = () => {
  const drawerContainerElement = document.createElement('div')
  drawerContainerElement.id = 'drawer-container'
  document.body.appendChild(drawerContainerElement)

  const vnode = h(DrawerContainer, { drawerServiceState, reactiveProps })
  render(vnode, drawerContainerElement)
}

// Если компонент DrawerContainer ещё не был добавлен в DOM, создаем его
const ensureDrawerContainerExists = () => {
  if (!document.getElementById('drawer-container')) {
    createDrawerContainer()
  }
}

const showDrawer = (
  componentName: string, // Component name from drawerComponents: {...}
  drawerProps: Partial<IDrawerProps> = {},
  componentProps = {}
) => {
  //@ts-ignore
  if (!drawerComponents.value[componentName]) {
    return console.warn(
      'The component is not provided in Mediacube-ui DS\n' +
        'Check and add to app.use(MediacubeUI, { drawerComponents: {...} })'
    )
  }
  ensureDrawerContainerExists()

  const id = Date.now()
  const newDrawer: IDrawerState = {
    //@ts-ignore
    component: markRaw(drawerComponents.value[componentName]),
    componentName: componentName,
    drawerProps: drawerProps,
    componentProps: componentProps,
    modelValue: true,
    id,
    close: () => {
      //@ts-ignore
      const drawerToClose = reactiveProps.drawers.findLast((d) => d.id === id)
      drawerToClose.modelValue = false
      setTimeout(() => {
        reactiveProps.drawers = reactiveProps.drawers.filter((d) => d.id !== drawerToClose.id)
      }, drawerProps?.duration || 300)
    }
  }
  reactiveProps.drawers.push(newDrawer)
  drawerServiceState.isOpen = true
}

const closeDrawer = (componentName: string) => {
  //@ts-ignore
  const drawerToClose = reactiveProps.drawers.findLast((d) => d.componentName === componentName)
  drawerToClose && drawerToClose.close()
}

const closeAllDrawers = () => {
  reactiveProps.drawers.forEach((d) => {
    d.close()
  })
}

export function useDrawer() {
  //@ts-ignore
  const { proxy } = getCurrentInstance()
  if (proxy.$dsOptions?.drawerComponents) {
    drawerComponents.value = proxy.$dsOptions.drawerComponents
  }

  return { showDrawer, closeDrawer, closeAllDrawers }
}
