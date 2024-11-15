<script setup lang="ts">
import { type PropType, provide, ref } from 'vue'
import type { ICollapse, ICollapseEmitPayload } from '@/types/ICollapse'
import { useDebounceFn } from '@vueuse/core'

/**
 * Работает с дочерними mc-collapse
 */

const debounceFn = useDebounceFn((method) => {
  method()
}, 50)

const props = defineProps({
  isSingleOpen: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  defaultOpenIndex: {
    type: Number as PropType<number>
  }
})
const collapses = ref<ICollapse[]>([])

const recalculateCollapses = ({ value, component }: ICollapseEmitPayload) => {
  if (!value) return

  collapses.value.forEach(collapse => {
    if (collapse.id !== component.id) {
      collapse.close()
    }
  })
}

const handleTrigger = (event: string, { value, component }: ICollapseEmitPayload): void => {
  if (props.isSingleOpen) recalculateCollapses({ value, component })
}

const selfRegisterCollapseMethod = (payload: ICollapse): void => {
  collapses.value.push(payload)
  const openIndex = props.defaultOpenIndex
  debounceFn(() => {
    if ((openIndex || openIndex === 0) && !!collapses.value[openIndex]) {
      collapses.value[openIndex].open()
    }
  })
}
provide('selfRegisterCollapseMethod', selfRegisterCollapseMethod)
provide('accordionTriggerMethod', handleTrigger)
</script>

<template>
  <div class="mc-accordion">
    <!-- @slot Слот для дочерних mc-collapse -->
    <slot />
  </div>
</template>

<style lang="scss">
@import '../../../assets/tokens/font-families';
.mc-accordion {
  $block-name: &;
  font-family: $font-family-main;
}
</style>
