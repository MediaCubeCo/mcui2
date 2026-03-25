<script setup lang="ts">
import { useFieldErrors } from '@/composables/useFieldErrors'
import { computed, type PropType, useSlots, watch } from 'vue'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'
import type { SizesUnion } from '@/types/styles/Sizes'
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types/styles/Colors'
import { ICheckboxMainCheckbox } from '@/types/ICheckbox'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const props = defineProps({
  //@ts-ignore
  modelValue: {
    type: [Boolean, String, Number, Array as PropType<string[] | number[]>],
    validator(value: unknown, props: any): boolean {
      return props.multiple ? Array.isArray(value) : true
    }
  },
  /**
   *  Name
   *
   */
  name: {
    type: String,
    default: null
  },
  /**
   *  Выбранное значение
   *
   */
  checkedValue: {
    type: [String, Boolean, Number],
    default: true
  },
  /**
   *  Невыбранное значение
   *
   */
  uncheckedValue: {
    type: [String, Boolean, Number],
    default: false
  },

  /**
   *  Ошибки
   *
   */
  errors: {
    type: Array as PropType<string[]>,
    default: null
  },

  /**
   *  Вспомогательный текст под инпутом:
   *
   */
  helpText: {
    type: String,
    default: null
  },

  /**
   *  Подпись чекбокса:
   *
   */
  mainText: {
    type: String,
    default: null
  },

  /**
   *  Заголовок поля:
   *
   */
  title: {
    type: String,
    default: null
  },

  /**
   *  Отключенное состояние
   *
   */
  disabled: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  checkboxSize: {
    type: String as () => SizeTypes,
    default: '250'
  },

  /**
   * Атрибут tabindex для главного элемента
   *
   */
  tabindex: {
    type: [String, Number]
  },
  dir: {
    type: String as () => Directions,
    default: Directions.Ltr
  },
  mainCheckbox: {
    type: Object as () => ICheckboxMainCheckbox | null,
    default: null
  }
})

const theme = useTheme('checkbox')
const fieldErrors = useFieldErrors(props.errors)

const rtl = computed((): boolean => {
  return props.dir === Directions.Rtl
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-field-checkbox': true,
  'mc-field-checkbox--error': props.errors,
  'mc-field-checkbox--disabled': props.disabled,
  'mc-field-checkbox--empty': !props.mainText && !slots['default'],
  'mc-field-checkbox--rtl': rtl.value
}))

const styles = computed((): { [key: string]: SizesUnion | string } => ({
  '--mc-field-checkbox-size': Sizes[props.checkboxSize as SizeTypes],
  '--mc-field-checkbox-color': theme.colors[theme.component.color as ColorTypes]
}))

const isMainCheckbox = computed((): boolean => {
  return (
    !!props.mainCheckbox &&
    props.mainCheckbox.all?.constructor === Array &&
    props.mainCheckbox.selected?.constructor === Array
  )
})

const isAllCheckboxesSelected = computed((): boolean => {
  if (props.mainCheckbox) {
    return props.mainCheckbox.all.every((id: number | string) => props.mainCheckbox.selected.includes(id))
  }
  return false
})

const checkboxIcon = computed((): string => {
  if (isMainCheckbox.value) {
    return isAllCheckboxesSelected.value
      ? 'checkbox--checked'
      : props.mainCheckbox.selected?.length > 0
        ? 'checkbox--indeterminate'
        : 'checkbox'
  }
  return isChecked.value ? 'checkbox--checked' : 'checkbox'
})
const checkboxColor = computed((): string => {
  if (isMainCheckbox.value) {
    const color: ColorTypes = theme.component.color as ColorTypes
    return isAllCheckboxesSelected.value ? color : props.mainCheckbox.selected?.length > 0 ? color : 'gray'
  }
  console.log(theme.component.color)
  return isChecked.value ? (theme.component.color as ColorTypes) : 'gray'
})

const isChecked = computed((): boolean => {
  return props.multiple && props.modelValue
    ? props.modelValue.includes(props.checkedValue)
    : props.modelValue === props.checkedValue
})

const inputProps = computed((): object => ({
  disabled: props.disabled,
  name: props.name,
  checked: isChecked.value,
  tabindex: props.tabindex,
  type: 'checkbox',
  class: 'mc-field-checkbox__input'
}))

const handleChange = (e: Event): void => {
  fieldErrors.toggleErrorVisible()

  const payload =
    props.multiple && props.modelValue
      ? props.modelValue.includes(props.checkedValue)
        ? props.modelValue.filter((v: boolean) => v !== props.checkedValue)
        : [...props.modelValue, props.checkedValue]
      : //@ts-ignore
        e.target && e.target.checked
        ? props.checkedValue
        : props.uncheckedValue

  emit('update:modelValue', payload)
}

watch(
  () => props.errors,
  (value: string[]): void => {
    fieldErrors.setError(value)
  }
)
</script>

<template>
  <div :dir="props.dir" :class="classes" :style="styles">
    <div v-if="props.title || $slots.header" class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :weight="Weights.Medium">{{ props.title }}</mc-title>
      </slot>
    </div>
    <div class="mc-field-checkbox__input-wrap">
      <label class="mc-field-checkbox__name">
        <mc-svg-icon
          class="mc-field-checkbox__icon"
          :name="checkboxIcon"
          :color="checkboxColor"
          :size="props.checkboxSize"
        />
        <input v-bind="inputProps" @change="handleChange" />
        <span v-if="props.mainText || $slots.default" class="mc-field-checkbox__name-text">
          <!-- @slot Слот для пользовательской подписи чекбокса -->
          <slot>
            <mc-title tag-name="div">{{ props.mainText }}</mc-title>
          </slot>
        </span>
      </label>
      <div class="mc-field-checkbox__footer">
        <mc-title
          v-if="fieldErrors.errorText.value"
          tag-name="div"
          color="red"
          :variation="TitleVariations.Overline"
          max-width="100%"
        >
          {{ fieldErrors.errorText.value }}
        </mc-title>
        <br v-if="fieldErrors.errorText.value" />
        <!-- @slot Слот доп. текста под чекбоксом -->
        <slot name="footer">
          <mc-title
            v-if="props.helpText"
            tag-name="div"
            :variation="TitleVariations.Overline"
            color="gray"
            max-width="100%"
          >
            {{ props.helpText }}
          </mc-title>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
