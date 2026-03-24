<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, type PropType } from 'vue'
import type { IDrawerServiceState, IDrawerState } from '@/types/IDrawer'
import McDrawerSafeComponent from '@/components/templates/McDrawer/McDrawerSafeComponent.vue'
const McDrawer = defineAsyncComponent(() => import('@/components/templates/McDrawer/McDrawer.vue'))

interface IEnrichedDrawerState extends IDrawerState {
  indent_coefficient: number
  real_coefficient: number
  indent: number
  can_show_overlay: boolean
}

const props = defineProps({
  drawerServiceState: {
    type: Object as PropType<IDrawerServiceState>,
    default: () => ({})
  },
  drawersCascadeIndent: {
    type: Number as PropType<number>,
    default: 50
  },
  drawersMaxInCascade: {
    type: Number as PropType<number>,
    default: 7
  },
  reactiveProps: {
    type: Object as () => { drawers: IDrawerState[] },
    default: () => ({})
  }
})

const drawersList = computed((): IDrawerState[] => {
  return props.reactiveProps.drawers ?? []
})

const computedDrawers = computed((): IEnrichedDrawerState[] => {
  return drawersList.value.map((cDrawer, i) => {
    const indent_coefficient = drawersList.value.length - 1 - i
    const real_coefficient = Math.min(indent_coefficient, props.drawersMaxInCascade - 1)

    const last_drawer_has_overlay = drawersList.value.findLastIndex(
      // @ts-ignore
      // eslint-disable-next-line no-prototype-builtins
      (drawer) => !drawer?.drawerProps.hasOwnProperty('showOverlay') || drawer.drawerProps?.showOverlay
    )

    return {
      ...cDrawer,
      indent_coefficient,
      real_coefficient,
      indent: real_coefficient * props.drawersCascadeIndent,
      can_show_overlay: i === last_drawer_has_overlay
    }
  })
})

const containerStyle = computed((): { [key: string]: string | number } => ({
  zIndex: drawersList.value.length ? 10004 : -1,
  visibility: drawersList.value.length ? 'visible' : 'hidden'
}))

const closeDrawer = (value: IDrawerState) => {
  value.close()
  setTimeout(() => {
    if (computedDrawers.value.every((d) => !d.modelValue)) {
      props.drawerServiceState.closeServiceState()
    }
  }, value?.drawerProps?.duration || 300)
}

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.code === 'Escape' && computedDrawers.value?.length) {
    const last_drawer = computedDrawers.value[computedDrawers.value.length - 1]
    if (last_drawer.drawerProps?.disableBgClick) return
    last_drawer.close()
  }
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyUp)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <div class="mc-drawer-container" :style="containerStyle">
    <mc-drawer
      v-for="(drawer, i) in computedDrawers"
      :key="drawer.id"
      v-model="drawer.modelValue"
      v-bind="drawer.drawerProps"
      :show-overlay="drawer.can_show_overlay"
      @close="() => closeDrawer(drawer)"
      class="mc-drawer-container__item"
      :class="{ 'mc-drawer-container__item--multiple': computedDrawers.length - 1 !== i }"
      :style="drawer.indent ? { transform: `translateX(-${drawer.indent}px)` } : {}"
    >
      <Suspense>
        <mc-drawer-safe-component @error-captured="() => closeDrawer(drawer)">
          <component :is="drawer.component" v-bind="drawer.componentProps" @close-drawer="() => closeDrawer(drawer)" />
        </mc-drawer-safe-component>
      </Suspense>
    </mc-drawer>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
