<script setup lang="ts">
import { McTitle, McSvgIcon } from '@/components'
import { useFieldErrors } from '@/composables'
import { computed, type PropType, useSlots, watch } from 'vue'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'
import type { SizesUnion } from '@/types/styles/Sizes'
import { TitleVariations, Weights } from '@/enums'

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
  }
})

const fieldErrors = useFieldErrors(props.errors)

const rtl = computed((): boolean => {
  return props.dir === Directions.Rtl
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-field-checkbox': true,
  'mc-field-checkbox--error': props.errors,
  'mc-field-checkbox--disabled': props.disabled,
  'mc-field-checkbox--empty': !props.mainText && !slots.default,
  'mc-field-checkbox--rtl': rtl.value
}))

const styles = computed((): { [key: string]: SizesUnion | string } => ({
  '--mc-field-checkbox-size': Sizes[props.checkboxSize as SizeTypes]
}))

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

watch(() => props.errors, (value: string[]): void => {
  fieldErrors.setError(value)
})
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
          :name="isChecked ? 'checkbox--checked' : 'checkbox'"
          :color="isChecked ? 'purple' : 'gray'"
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

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-families' as *;
.mc-field-checkbox {
  $block-name: &;
  --mc-field-checkbox-size: #{$size-250};
  font-family: $font-family-main;
  position: relative;
  display: block;
  min-width: var(--mc-field-checkbox-size);
  min-height: var(--mc-field-checkbox-size);

  #{$block-name}__icon {
    width: var(--mc-field-checkbox-size);
    height: var(--mc-field-checkbox-size);
  }

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;

    &:empty {
      display: none;
    }
  }

  &__name {
    @include reset();
    position: relative;
    line-height: $line-height-200;
    font-size: $font-size-200;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__icon {
    z-index: 1;
    &:hover {
      color: $color-purple;
    }
  }

  &__name-text {
    display: inline-block;
    margin-inline-start: $space-100;
    &:before {
      @include pseudo(none);
      @include size(var(--mc-field-checkbox-size));
      @include position(absolute, 0 null null 0);
      background-size: 100%;
    }

    .mc-button {
      display: inline;
      white-space: normal;
      vertical-align: top;
      margin-inline-start: 1px;

      &__text {
        white-space: normal;
        display: inline;
      }
    }
  }

  &__input {
    display: none;
  }

  &__footer {
    padding-inline-start: $space-250;
    margin-top: $space-50;
    &:empty {
      display: none;
    }
  }

  &--disabled {
    #{$block-name} {
      &__icon {
        color: $color-outline-gray;
        &:hover {
          color: $color-outline-gray;
        }
      }
      &__name-text {
        &:before {
          display: block;
          border-radius: 2px;
          background-color: $color-hover-gray;
        }
      }
    }
  }

  &--empty {
    #{$block-name} {
      &__footer,
      &__name {
        padding: 0;
        margin: 0;
      }
    }
  }

  &--rtl {
    direction: rtl;
  }
}
</style>
