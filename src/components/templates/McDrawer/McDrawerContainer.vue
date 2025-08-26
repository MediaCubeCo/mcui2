<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { McDrawer } from '@/components'
import type { IDrawerServiceState, IDrawerState } from '@/types/IDrawer'
import { Mask } from '@/components/elements/McFieldText/McFieldText.stories'

interface IEnrichedDrawerState extends IDrawerState {
  indent_coefficient: number
  real_coefficient: number
  indent: number
}

const props = defineProps({
  drawerServiceState: {
    type: Object as PropType<IDrawerServiceState>,
    default: () => ({})
  },
  drawersCascadeIndent: {
    type: Number as PropType<number>,
    default: 50,
  },
  drawersMaxInCascade: {
    type: Number as PropType<number>,
    default: 7,
  },
  reactiveProps: {
    type: Object as () => { drawers: IDrawerState[] },
    default: () => ({})
  }
})

const computedDrawers = computed((): IEnrichedDrawerState[] => {
  return props.reactiveProps.drawers.map((cDrawer, i) => {
    const indent_coefficient = props.reactiveProps.drawers.length - 1 - i
    const real_coefficient = Math.min(indent_coefficient, props.drawersMaxInCascade - 1)
    return {
      ...cDrawer,
      indent_coefficient,
      real_coefficient,
      indent: real_coefficient * props.drawersCascadeIndent,
    }
  })
})

const containerStyle = computed((): { [key: string]: string | number } => ({
  zIndex: computedDrawers.value.length ? 10004 : -1,
  visibility: computedDrawers.value.length ? 'visible' : 'hidden'
}))
const closeDrawer = (value: IDrawerState) => {
  value.close()
  setTimeout(() => {
    if (computedDrawers.value.every((d) => !d.modelValue)) {
      props.drawerServiceState.closeServiceState()
    }
  }, value?.drawerProps?.duration || 300)
}
</script>

<template>
  <div class="mc-drawer-container" :style="containerStyle">
    <mc-drawer
      v-for="(drawer, i) in computedDrawers"
      :key="drawer.id"
      v-model="drawer.modelValue"
      v-bind="drawer.drawerProps"
      :show-overlay="i + 1 === computedDrawers.length"
      @close="() => closeDrawer(drawer)"
      class="mc-drawer-container__item"
      :class="{ 'mc-drawer-container__item--blur': computedDrawers.length - 1 !== i }"
      :style="{ transform: `translateX(-${drawer.indent}px)` }"
    >
      <component :is="drawer.component" v-bind="drawer.componentProps" @close-drawer="() => closeDrawer(drawer)" />
    </mc-drawer>
  </div>
</template>

<style lang="scss">
.mc-drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  &__item {
    transition: transform 0.25s ease-in-out;
    &--blur {
      filter: blur(2px);
    }
  }
}
</style>
