<script setup lang="ts">
import { type ColorTypes } from '@/types/styles/Colors'
import type { TooltipPositionsUnion, TooltipSizesUnion } from '@/types/ITooltip'
import { useTooltip } from '@/composables'
import { computed, type PropType } from 'vue'
import type { ITooltip } from '@/types/ITooltip'
import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'
import { useTheme } from '@/composables/useTheme'

const vTooltip = useTooltip()

const props = defineProps({
  /**
   *  Текст подсказки:
   */
  content: {
    type: String as PropType<string>,
    required: true,
  },
  /**
   *  Расположение:
   */
  placement: {
    type: String as () => TooltipPositionsUnion,
    default: TooltipPositions.Top,
  },
  /**
   *  Цвет:
   */
  color: {
    type: String as () => ColorTypes,
  },
  /**
   *  Цвет текста:
   */
  textColor: {
    type: String as () => ColorTypes,
  },
  /**
   * Максимальный размер
   */
  size: {
    type: String as () => TooltipSizesUnion,
    default: TooltipSizes.S,
  },
  /**
   *  Всключить стрелку
   */
  arrowVisible: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})

const theme = useTheme('tooltip')

const computedColor = computed((): ColorTypes => {
  return props.color || theme.component.color as ColorTypes
})
const computedTextColor = computed((): ColorTypes => {
  return props.textColor || theme.component.textColor as ColorTypes
})

const tooltipProps = computed<ITooltip>((): ITooltip => {
  return {
    content: props.content,
    size: props.size,
    placement: props.placement,
    arrow: props.arrowVisible,
    color: computedColor.value,
    textColor: computedTextColor.value,
  } as ITooltip
})
</script>

<template>
  <div v-tooltip="tooltipProps" class="mc-tooltip-target">
    <!-- @slot Слот для элемента, у которого будет всплывать тултип -->
    <slot />
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/tooltip' as *;
@use '../../../assets/tokens/font-families' as *;

.mc-tooltip-target {
  $block-name: &;
  max-width: 100%;
  width: max-content;
  font-family: $font-family-main;
}
</style>
