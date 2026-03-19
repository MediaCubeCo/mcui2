<script setup lang="ts">
import McChip from '@/components/elements/McChip/McChip.vue'
import { computed, type PropType } from 'vue'
import type { ChipVariationUnion } from '@/types/IChip'
import type { ColorTypes } from '@/types/styles/Colors'
import { ChipSize } from '@/enums/Chip'
import { type IFilterTag } from '@/types/IFilter'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps({
  /**
   *  Объект тэга
   */
  tag: {
    type: Object as PropType<IFilterTag>,
    required: true
  },
  /**
   *  Закрывающийся
   */
  closable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Активный
   */
  isActive: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const theme = useTheme('filter')

const computedCategory = computed((): string => {
  const append = props.tag.title ? ':' : ''
  return `${props.tag.categoryName}${append}`
})

const computedVariation = computed((): ChipVariationUnion => {
  return props.closable ? `${theme.component.chipColor}-invert` as ColorTypes : 'hover-gray'
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-filter-chip': true,
    'mc-filter-chip--closable': props.closable,
    'mc-filter-chip--is-active': props.isActive
  }
})
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-filter-chip-color': theme.colors[theme.component.chipColor as ColorTypes],
  }
})

const handleChipClick = (e: Event): void => {
  e.stopPropagation()
  /**
   * Событие по закрытию тэга
   */
  emit('close')
}
</script>

<template>
  <mc-chip
    :closable="closable"
    :variation="computedVariation"
    :class="classes"
    :style="styles"
    :size="ChipSize.S"
    text-color="black"
    @close="handleChipClick"
  >
    <span v-if="tag.categoryName" class="mc-filter-chip__category">{{ computedCategory }}</span
    >&nbsp;
    <span v-if="tag.title">{{ tag.title }}</span>
  </mc-chip>
</template>

<style lang="scss" src="./index.scss"></style>
