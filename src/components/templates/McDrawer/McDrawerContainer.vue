<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { McDrawer } from '@/components'
import type { IDrawerServiceState, IDrawerState } from '@/types/IDrawer'

const props = defineProps({
  drawerServiceState: {
    type: Object as PropType<IDrawerServiceState>,
    default: () => ({})
  },
  reactiveProps: {
    type: Object as () => { drawers: IDrawerState[] },
    default: () => ({})
  }
})

const containerStyle = computed((): { [key: string]: string | number } => ({
  zIndex: props.reactiveProps.drawers.length ? 99 : -1,
  visibility: props.reactiveProps.drawers.length ? 'visible' : 'hidden'
}))
const closeDrawer = (value: IDrawerState) => {
  value.close()
  setTimeout(() => {
    if (props.reactiveProps.drawers.every((d) => !d.modelValue)) {
      props.drawerServiceState.closeServiceState()
    }
  }, value?.drawerProps?.duration || 300)
}
</script>

<template>
  <div class="mc-drawer-container" :style="containerStyle">
    <mc-drawer
      v-for="(drawer, i) in props.reactiveProps.drawers"
      :key="drawer.id"
      v-model="drawer.modelValue"
      v-bind="drawer.drawerProps"
      :show-overlay="i + 1 === props.reactiveProps.drawers.length"
      @close="() => closeDrawer(drawer)"
    >
      <component :is="drawer.component" v-bind="drawer.componentProps" @close-drawer="() => closeDrawer(drawer)" />
    </mc-drawer>
  </div>
</template>

<style>
.mc-drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
