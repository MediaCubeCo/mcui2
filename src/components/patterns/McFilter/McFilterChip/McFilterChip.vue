<script setup lang="ts">
import { McChip } from '@/components'
import { computed, type PropType } from 'vue'
import type { ChipVariationUnion, ColorTypes } from '@/types'
import { ChipSize } from '@/enums'
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
    @close="handleChipClick"
  >
    <span v-if="tag.categoryName" class="mc-filter-chip__category">{{ computedCategory }}</span
    >&nbsp;
    <span v-if="tag.title">{{ tag.title }}</span>
  </mc-chip>
</template>

<style lang="scss">
@use 'sass:color' as sasscolor;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/font-weights' as *;
.mc-filter-chip {
  $block-name: &;
  border-radius: $space-50;
  white-space: nowrap;
  word-break: normal;
  &__category {
    font-weight: $font-weight-semi-bold;
  }
  &--closable {
    border-radius: $space-150;
    &:hover {
      cursor: pointer;
      background-color: color-mix(in srgb, var(--mc-filter-chip-color), white 60%);
    }
  }
  &--is-active {
    background-color: color-mix(in srgb, var(--mc-filter-chip-color), white 60%);
  }
  .mc-title {
    width: auto;
  }
}
</style>
