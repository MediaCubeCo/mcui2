<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { useFieldErrors } from '@/composables'

const props = defineProps({
  /**
   *  Процент
   *
   */
  percent: {
    type: Number as PropType<number>,
    default: 0
  },
  /**
   *  Число для отображения, если не укказано, используется процент
   *
   */
  amount: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: null
  },
  /**
   *  Цвет
   *
   */
  color: {
    type: String as () => ColorTypes,
    default: 'dark-gray'
  },
  /**
   *  Цвет текста
   *
   */
  helpTextColor: {
    type: String as () => ColorTypes,
    default: 'gray'
  },
  /**
   *  Вспомогательный текст
   */
  helpText: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Ошибки
   */
  errors: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   *  Поменять местами подписи
   */
  reverseHeaders: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Использовать моноширинный шрифт для percent и amount
   */
  monospaceNumbers: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const fieldErrors = useFieldErrors(props.errors)
const wrapperClasses = computed(() => ({
  'mc-progress': true,
  'mc-progress--error': fieldErrors.errorText.value
}))
const topClasses = computed(() => ({
  'mc-progress__top': true,
  'mc-progress__top--reverse-headers': props.reverseHeaders
}))
const percentClasses = computed(() => ({
  'mc-progress__percent': true,
  'mc-progress__percent--monospace': props.monospaceNumbers
}))
const lineClasses = computed(() => ({
  'mc-progress__line': true
}))
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-progress-color': Colors[props.color]
  }
})
const helpTextStyles = computed(() => {
  return {
    '--mc-progress-help-text-color': Colors[props.helpTextColor]
  }
})
const lineStyles = computed(() => {
  return {
    width: `${fieldErrors.errorText.value ? 2 : Math.sign(props.percent) > 0 ? props.percent : 0}%`
  }
})
const percentValue = computed(() => {
  if (fieldErrors.errorText.value) return 0
  return props.amount ?? `${props.percent}%`
})
</script>

<template>
  <div :class="wrapperClasses" :style="styles">
    <div :class="topClasses">
      <div :class="percentClasses">
        {{ percentValue }}
      </div>
      <div v-if="props.helpText" class="mc-progress__help-text" :style="helpTextStyles">
        {{ props.helpText }}
      </div>
    </div>
    <div class="mc-progress__wrapper-line">
      <div :class="lineClasses" :style="lineStyles"></div>
    </div>
    <div v-if="fieldErrors.errorText.value" class="mc-progress__errors-container">
      {{ fieldErrors.errorText.value }}
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
.mc-progress {
  $block-name: &;
  --mc-progress-color: #{$color-dark-gray};
  --mc-progress-help-text-color: #{$color-gray};
  position: relative;
  width: 100%;
  font-family: $font-family-main;
  line-height: $line-height-200;
  font-size: $font-size-200;
  &__percent {
    flex-shrink: 0;
    color: var(--mc-progress-color);
    &--monospace {
      font-feature-settings: 'tnum';
      font-variant-numeric: tabular-nums;
    }
  }
  &--error {
    #{$block-name} {
      &__percent {
        color: $color-red;
      }
      &__line {
        background-color: $color-red;
      }
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-100;
    &--reverse-headers {
      flex-direction: row-reverse;
    }
  }

  &__help-text {
    color: var(--mc-progress-help-text-color);
  }

  &__wrapper-line {
    height: $size-100;
    border-radius: $radius-100;
    background-color: $color-hover-gray;
    width: 100%;
  }

  &__line {
    height: 100%;
    border-radius: $radius-100;
    max-width: 100%;
    background-color: var(--mc-progress-color);
  }

  &__errors-container {
    margin-top: $space-150;
    color: $color-red;
  }
}
</style>
