<script setup lang="ts">
import { McTitle } from '@/components'
import { useFieldErrors } from '@/composables'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { computed, type PropType } from 'vue'
import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { HorizontalAlignment } from '@/enums/ui/Alignment'
import { TitleVariations } from '@/enums'

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
    default: 'purple' as ColorTypes
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

const fieldErrors = useFieldErrors(props.errors)

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
  switch (props.color) {
    case 'purple' as ColorTypes: {
      disabledColor = 'light-purple' as ColorTypes
      break
    }
    default: {
      disabledColor = props.color
      saturateValue = '50%'
    }
  }
  return {
    '--mc-field-toggle-color': props.color && Colors[props.color],
    '--mc-field-toggle-disabled-color': disabledColor && Colors[disabledColor],
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
</script>

<template>
  <div class="mc-field-toggle__content">
    <label :class="classes" :style="styles">
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

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/border-radius' as *;
.mc-field-toggle {
  $block-name: &;
  $toggle-indent: calc(#{$space-50} / 2);
  --mc-field-toggle-disabled-color: #{$color-purple};
  font-family: $font-family-main;
  --mc-field-toggle-color: initial;
  --mc-field-disabled-color: initial;
  --mc-field-toggle-saturate-value: initial;
  display: flex;
  align-items: center;
  cursor: pointer;

  &__text {
    color: $color-black;
    transition: color $duration-m;
    line-height: $line-height-200;
    font-size: $font-size-200;
    margin-inline-end: $space-100;
    text-align: right;

    &:empty {
      margin-inline-end: 0;
    }
  }

  &--colored-text {
    #{$block-name}__text {
      color: $color-gray;
    }

    @at-root #{$block-name}--checked#{$block-name}--colored-text {
      #{$block-name}__text {
        color: $color-purple;
      }
    }
    @at-root #{$block-name}--disabled#{$block-name}--colored-text {
      #{$block-name}__text {
        color: $color-outline-gray;
      }
    }
    @at-root #{$block-name}--checked#{$block-name}--disabled#{$block-name}--colored-text {
      #{$block-name}__text {
        color: $color-light-purple;
      }
    }
  }

  &--text-position-right {
    #{$block-name}__text {
      order: 2;
      margin-inline: $space-100 0;
      text-align: left;
    }
  }
  &__content {
    @include child-indent-bottom($space-50);
  }

  &__wrapper {
    position: relative;
    display: inline-block;
    @include size($size-550, $size-250);
    flex-shrink: 0;
    & > #{$block-name}__field {
      opacity: 0;
      @include size(0);

      &:checked + #{$block-name}__slider {
        background-color: $color-purple;

        &:before {
          inset-inline-start: calc(#{$space-300} + #{$toggle-indent});
        }
      }
    }

    #{$block-name}__slider {
      @include position(absolute, 0 0 0 0);
      background-color: $color-gray;
      transition: $duration-m;
      border-radius: 100px;

      &::before {
        @include pseudo();
        @include size($size-200);
        @include position(null, null null $toggle-indent $toggle-indent);
        background-color: $color-white;
        transition: $duration-m;
        border-radius: $radius-circle;
      }
    }
  }

  &--disabled {
    cursor: auto;
    #{$block-name}__slider {
      background-color: $color-outline-gray !important;
      &::before {
        background-color: $color-hover-gray;
      }
    }
  }
  #{$block-name}__wrapper > #{$block-name}__field:checked + #{$block-name}__slider {
    background-color: var(--mc-field-toggle-color);
  }
  &#{$block-name}--disabled {
    &#{$block-name}--checked #{$block-name}__slider {
      background-color: var(--mc-field-toggle-disabled-color) !important;
      filter: saturate(var(--mc-field-toggle-saturate-value));
    }
  }
}
</style>
