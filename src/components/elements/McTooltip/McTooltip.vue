<script setup lang="ts">
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import type { TooltipPositionsUnion, TooltipSizesUnion } from '@/types/ITooltip'
import { useTooltip } from '@/composables/useTooltip'
import { computed, type PropType } from 'vue'
import type { ITooltip } from '@/types/ITooltip'
import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'

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
    default: Colors.black,
  },
  /**
   *  Цвет текста:
   */
  textColor: {
    type: String as () => ColorTypes,
    default: Colors.white,
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

const tooltipProps = computed<ITooltip>((): ITooltip => {
  return {
    content: props.content,
    size: props.size,
    placement: props.placement,
    arrow: props.arrowVisible,
    color: props.color,
    textColor: props.textColor,
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
@import '../../../assets/styles/tooltip';

.mc-tooltip-target {
  $block-name: &;
  max-width: 100%;
  width: max-content;
  font-family: $font-family-main;
}
</style>
