<script setup lang="ts">
import { McTitle, McSvgIcon } from '@/components'
import { computed, type PropType, useSlots, watch } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { SizeTypes } from '@/types/styles/Sizes'
import { useFieldErrors } from '@/composables'
import type { RadioVariationUnion } from '@/types/IRadio'
import { Directions } from '@/enums/ui/Directions'
import { type DirectionsUnion } from '@/types/IDirections'
import type { IconsListUnion } from '@/types/styles/Icons'
import { TitleVariations } from '@/enums'

const slots = useSlots()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    default: null
  },
  value: {
    default: null
  },
  /**
   *  Name
   */
  name: {
    type: String,
    required: true
  },
  /**
   *  Подпись радио:
   *
   */
  label: {
    type: [String, Number],
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
   *  Ошибки
   *
   */
  errors: {
    type: Array as PropType<string[]>,
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

  /**
   * Атрибут tabindex для главного элемента
   *
   */
  tabindex: {
    type: [String, Number]
  },
  /**
   * Вариант активного состояния
   * circle - внутри круг
   * checkmark - внутри галочка
   * */
  variation: {
    type: String as () => RadioVariationUnion,
    default: 'circle'
  },
  /**
   * цвет
   */
  color: {
    type: String as () => ColorTypes,
    default: 'purple'
  },
  iconSize: {
    type: String as () => SizeTypes,
    default: '250'
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  }
})
const fieldErrors = useFieldErrors(props.errors)

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-field-radio-button--disabled': props.disabled,
    'mc-field-radio-button--empty': !props.label && !slots.default,
    'mc-field-radio-button--rtl': rtl.value
  }
})
const rtl = computed((): boolean => {
  return props.dir === Directions.Rtl
})

const activeIcon = computed((): IconsListUnion => {
  switch (props.variation) {
    case 'checkmark': {
      return 'check_circle_solid'
    }
    default: {
      return 'radio--checked'
    }
  }
})

const iconColor = computed((): ColorTypes => {
  switch (true) {
    case props.disabled:
      return 'outline-gray'
    case inputProps.value.checked:
      return props.color as ColorTypes
    default:
      return 'gray'
  }
})

const inputProps = computed((): { [key: string]: any } => {
  return {
    disabled: props.disabled,
    value: props.modelValue,
    name: props.name,
    checked: props.value && props.value === props.modelValue,
    tabindex: props.tabindex,
    class: 'mc-field-radio-button__input',
    type: 'radio'
  }
})

watch(
  () => props.modelValue,
  () => {
    fieldErrors.toggleErrorVisible()
  }
)

watch(() => props.errors, (value: string[]): void => {
  fieldErrors.setError(value)
})

const handleChange = () => {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label :dir="props.dir" class="mc-field-radio-button" :class="classes">
    <input checked v-bind="inputProps" @change="handleChange" />
    <span class="mc-field-radio-button__icon_wrapper">
      <mc-svg-icon
        :name="inputProps.checked ? activeIcon : 'circle'"
        :color="iconColor"
        :size="props.iconSize"
        class="mc-field-radio-button__icon"
      />
    </span>
    <span v-if="label || $slots.default" class="mc-field-radio-button__text">
      <!-- @slot Слот для пользовательской подписи радио -->
      <slot>
        <mc-title>{{ label }}</mc-title>
      </slot>
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
      <!-- @slot -->
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
    </span>
  </label>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/border-radius' as *;
.mc-field-radio-button {
  $block-name: &;
  font-family: $font-family-main;
  min-width: $size-250;
  min-height: $size-250;
  @include reset();
  position: relative;
  line-height: $line-height-200;
  font-size: $font-size-200;
  cursor: pointer;
  display: inline-flex;

  &__icon {
    &_wrapper {
      z-index: 1;
      margin-inline-end: $space-50;
    }
  }

  &__text {
    display: inline-block;
    margin: 2px 0;
  }

  &__input {
    display: none;
  }

  &--disabled {
    cursor: auto;

    #{$block-name}__input {
      & ~ #{$block-name}__icon_wrapper {
        .mc-svg-icon {
          border-radius: $radius-circle;
          background-color: $color-hover-gray;
        }
      }
    }
  }

  &--empty {
    padding: 0;
    margin: 0;
  }
  &--rtl {
    direction: rtl;
  }
}
</style>
