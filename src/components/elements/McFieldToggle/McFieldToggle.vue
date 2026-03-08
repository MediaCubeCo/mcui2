<script setup lang="ts">
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import { useFieldErrors } from '@/composables/useFieldErrors'
import { type ColorTypes } from '@/types/styles/Colors'
import { computed, type PropType, watch } from 'vue'
import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { HorizontalAlignment } from '@/enums/ui/Alignment'
import { TitleVariations } from '@/enums/Title'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  /**
   *  Значение
   *
   */
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: null
  },
  /**
   *  Выбранное значение
   */
  checkedValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true
  },
  /**
   *  Невыбранное значение
   */
  uncheckedValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  /**
   *  Изменение цвета текста
   *  при переключении
   */
  coloredText: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Отключенное состояние
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Позиция текста
   *  относительно переключателя
   */
  textPosition: {
    type: String as () => HorizontalAlignmentUnion,
    default: 'left'
  },
  /**
   * Активный цвет
   */
  color: {
    type: String as () => ColorTypes,
  },
  /**
   *  Ошибки
   *
   */
  errors: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * Атрибут tabindex для главного элемента
   */
  tabindex: {
    type: [String, Number] as PropType<string | number>
  }
})

const theme = useTheme('fieldToggle')
const fieldErrors = useFieldErrors(props.errors)

const computedColor = computed(() => {
  return props.color || theme.component.color as ColorTypes
})

const _value = computed((): boolean => {
  return props.modelValue === props.checkedValue
})
const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-field-toggle': true,
    'mc-field-toggle--checked': _value.value,
    'mc-field-toggle--disabled': props.disabled,
    'mc-field-toggle--colored-text': props.coloredText,
    [`mc-field-toggle--text-position-${props.textPosition as HorizontalAlignment}`]: !!props.textPosition
  }
})

const styles = computed((): { [key: string]: string | undefined } => {
  let disabledColor: ColorTypes
  let saturateValue: string = 'initial'
  switch (computedColor.value) {
    case theme.component.color as ColorTypes: {
      disabledColor = theme.component.bg as ColorTypes
      break
    }
    default: {
      disabledColor = computedColor.value
      saturateValue = '50%'
    }
  }
  return {
    '--mc-field-toggle-color': computedColor.value && theme.colors[computedColor.value],
    '--mc-field-toggle-bg-color': theme.colors[theme.component.bg as ColorTypes],
    '--mc-field-toggle-disabled-color': disabledColor && theme.colors[disabledColor],
    '--mc-field-toggle-saturate-value': saturateValue
  }
})
const inputProps = computed<object>(() => {
  return {
    checked: _value.value,
    disabled: props.disabled,
    tabindex: props.tabindex,
    class: 'mc-field-toggle__field',
    type: 'checkbox'
  }
})

const change = (e: Event): void => {
  const target = e.target as HTMLInputElement
  const checked: boolean = target.checked
  fieldErrors.toggleErrorVisible()
  /**
   * Событие тоггла
   */
  emit('update:modelValue', checked ? props.checkedValue : props.uncheckedValue)
}

watch(() => props.errors, (value: string[]): void => {
  fieldErrors.setError(value)
})
</script>

<template>
  <div class="mc-field-toggle__content" :style="styles">
    <label :class="classes">
      <span class="mc-field-toggle__text">
        <!-- @slot Слот для тайтла тогглера -->
        <slot />
      </span>
      <span class="mc-field-toggle__wrapper">
        <input v-bind="inputProps" @input="change" />
        <span class="mc-field-toggle__slider"></span>
      </span>
    </label>
    <mc-title
      v-if="fieldErrors.errorText.value"
      tag-name="div"
      color="red"
      :variation="TitleVariations.Overline"
      max-width="100%"
    >
      {{ fieldErrors.errorText.value }}
    </mc-title>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
