<script setup lang="ts">
import { default as VueSlider } from 'vue-3-slider-component'
import { computed, type PropType, reactive } from 'vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import type { TooltipPositionsUnion } from '@/types/ITooltip'
import { McTitle } from '@/components'
import { useFieldErrors } from '@/composables'
import { TitleVariations, Weights } from '@/enums'

type RangeValue = string[] | number[] | number | string | null

const emit = defineEmits(['update:modelValue', 'dragging'])
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: [Number, String, Array] as PropType<RangeValue>,
    required: true
  },
  /**
   *  Мин. значение
   */
  min: {
    type: [String, Number] as PropType<number | string>,
    default: 0
  },
  /**
   *  Макс. значение
   */
  max: {
    type: [String, Number] as PropType<number | string>,
    default: 100
  },
  /**
   *  The interval between two values.
   */
  step: {
    type: [String, Number] as PropType<number | string>,
    default: 1
  },
  title: {
    type: String as PropType<string | null>,
    default: null
  },
  helpText: {
    type: String as PropType<string | null>,
    default: null
  },
  /**
   *  Цвет слайдера
   */
  color: {
    type: String as () => ColorTypes,
    default: 'purple'
  },
  /**
   *  Is it lazy to update the value.
   *  Useful whenever you need to consume a high-loss operation
   */
  lazy: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Whether to disable the component.
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Control Tooltip display.
   *  'none' | 'always' | 'hover' | 'focus' | 'active'
   */
  tooltip: {
    type: String as PropType<string>,
    default: 'hover'
  },
  /**
   *  The placement of the Tooltip.
   *  'top' | 'right' | 'bottom' | 'left'
   */
  tooltipPlacement: {
    type: String as () => TooltipPositionsUnion,
    default: 'top'
  },
  coloredTooltip: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  smooth: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showLabels: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  errors: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const fieldErrors = useFieldErrors(props.errors)

const tooltipFormatter = (value: string): string => {
  //@ts-ignore
  if (Number(value) !== value) return value
  return ('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    handleInput(value)
  }
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-range-slider': true,
    [`mc-range-slider--color-${props.color}`]: !!props.color,
    'mc-range-slider--colored-tooltip': props.coloredTooltip
  }
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-range-slider-color': Colors[props.color]
  }
})

const sliderProps = reactive({
  style: styles.value,
  interval: +props.step,
  min: +props.min,
  max: +props.max,
  disabled: props.disabled,
  lazy: props.lazy,
  tooltip: props.tooltip,
  marks: props.showLabels,
  adsorb: !props.smooth,
  'tooltip-placement': props.tooltipPlacement,
  'tooltip-formatter': tooltipFormatter,
  'dot-size': 20
})
const handleInput = (value: RangeValue): void => {
  /**
   * Событие по изменению значения
   */
  emit('update:modelValue', value)
}

const handleDrag = (value: RangeValue): void => {
  /**
   * Событие по изменению значения
   * (если нужно отслеживать value в ленивом режиме)
   */
  emit('dragging', value)
}
</script>

<template>
  <div :class="classes">
    <div class="mc-field-range__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title v-if="props.title" :weight="Weights.Medium">
          {{ props.title }}
        </mc-title>
      </slot>
    </div>
    <vue-slider v-model="computedValue" v-bind="sliderProps" @change="handleInput" @dragging="handleDrag" />
    <template v-if="(fieldErrors.errorText.value || props.helpText || $slots.footer) && props.showLabels">
      <br />
    </template>
    <div v-if="fieldErrors.errorText.value || props.helpText || $slots.footer" class="mc-field-range__footer">
      <template v-if="fieldErrors.errorText.value">
        <mc-title
          tag-name="div"
          color="red"
          :variation="TitleVariations.Overline"
          class="mc-field-range__error-text"
          :html-data="fieldErrors.errorText.value"
        />
        <br />
      </template>
      <!-- @slot Слот доп. текста под инпутом -->
      <slot name="footer">
        <mc-title
          v-if="props.helpText"
          tag-name="div"
          :variation="TitleVariations.Overline"
          color="gray"
          max-width="100%"
        >
          {{ helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/box-shadows' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/font-families' as *;
.mc-range-slider {
  $block-name: &;
  font-family: $font-family-main;
  --mc-range-slider-color: #{$color-purple};
  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;

    &:empty {
      display: none;
    }
  }
  &__footer {
    margin-top: $space-50;
    line-height: $line-height-150;

    &:empty {
      display: none;
    }
  }

  .vue-slider-dot-tooltip-inner {
    line-height: $line-height-200;
    font-size: $font-size-200;
    padding: $space-100 $space-150;
    background-color: $color-black;
    border-color: $color-black;
  }
  .vue-slider-process {
    background-color: var(--mc-range-slider-color);
  }

  .vue-slider-dot-handle-focus {
    box-shadow: $shadow-s;
  }
  .vue-slider-dot-handle {
    box-shadow: $shadow-s;
    &:hover {
      border: 2px solid var(--mc-range-slider-color);
    }
    &:active {
      border: 2px solid var(--mc-range-slider-color);
    }
  }
  &--colored-tooltip {
    .vue-slider-dot-tooltip-inner {
      background-color: var(--mc-range-slider-color);
      border-color: var(--mc-range-slider-color);
      padding: $space-100 $space-150;
    }
  }
  &.vue-slider {
    .vue-slider-rail {
      cursor: pointer;
    }
    &-disabled {
      .vue-slider-rail {
        cursor: auto;
      }
    }
  }
}
</style>
