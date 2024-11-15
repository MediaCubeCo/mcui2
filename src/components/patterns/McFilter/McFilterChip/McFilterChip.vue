<script setup lang="ts">
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McChip from '@/components/elements/McChip/McChip.vue'
import { computed, type PropType } from 'vue'
import type { ChipVariationUnion } from '@/types'
import { ChipSize, Weights } from '@/enums'
import { type IFilterChip } from '@/types/IFilter'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps({
  /**
   *  Объект тэга
   */
  tag: {
    type: Object as PropType<IFilterChip>,
    required: true,
  },
  /**
   *  Закрывающийся
   */
  closable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   *  Активный
   */
  isActive: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const computedCategory = computed((): string => {
  const append = props.tag.title ? ':' : ''
  return `${props.tag.categoryName}${append}`
})

const computedVariation = computed((): ChipVariationUnion => {
  return props.closable ? 'purple-invert' : 'hover-gray'
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-filter-chip': true,
    'mc-filter-chip--closable': props.closable,
    'mc-filter-chip--is-active': props.isActive,
  }
})

const handleChipClick = (e: Event) => {
  e.stopPropagation()
  /**
   * Событие по закрытию тэга
   */
  emit('close')
}
</script>

<template>
  <mc-chip :closable="closable" :variation="computedVariation" :class="classes" :size="ChipSize.S" @close="handleChipClick">
    <mc-title v-if="tag.categoryName" :weight="Weights.SemiBold">{{ computedCategory }}</mc-title>&nbsp;
    <mc-title v-if="tag.title">{{ tag.title }}</mc-title>
  </mc-chip>
</template>

<style lang="scss">
@import "../../../../assets/tokens/spacings";
@import "../../../../assets/tokens/colors";
.mc-filter-chip {
    $block-name: &;
    border-radius: $space-50;
    &--closable {
        border-radius: $space-150;
        &:hover {
            cursor: pointer;
            background-color: fade-out($color-purple, 0.6);
        }
    }
    &--is-active {
        background-color: fade-out($color-purple, 0.6);
    }
    .mc-title {
        width: auto;
    }
}
</style>
