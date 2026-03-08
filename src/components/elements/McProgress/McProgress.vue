<script setup lang="ts">
import { computed, type PropType, watch } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import { useFieldErrors } from '@/composables/useFieldErrors'
import { useTheme } from '@/composables/useTheme'

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
  },
  /**
   *  Цвет текста
   *
   */
  helpTextColor: {
    type: String as () => ColorTypes,
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

const theme = useTheme('progress')

const fieldErrors = useFieldErrors(props.errors)

const computedColor = computed((): ColorTypes => {
  return props.color || theme.component.color as ColorTypes
})
const computedHelpTextColor = computed((): ColorTypes => {
  return props.helpTextColor || theme.component.helpText as ColorTypes
})

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
    '--mc-progress-color': theme.colors[computedColor.value],
    '--mc-progress-help-text-color': theme.colors[computedHelpTextColor.value]
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

watch(() => props.errors, (value: string[]): void => {
  fieldErrors.setError(value)
})
</script>

<template>
  <div :class="wrapperClasses" :style="styles">
    <div :class="topClasses">
      <div :class="percentClasses">
        {{ percentValue }}
      </div>
      <div v-if="props.helpText" class="mc-progress__help-text">
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

<style lang="scss" src="./index.scss"></style>
