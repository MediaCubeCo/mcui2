<script setup lang="ts">
import { McTitle, McFieldRadio } from '@/components'
import { computed, type PropType, watch } from 'vue'
import { useFieldErrors } from '@/composables'
import type { IRadioGroupOptions, IRadioGroupOption } from '@/types/IRadioGroup'
import { type DirectionsUnion } from '@/types/IDirections'
import { Directions } from '@/enums/ui/Directions'
import type { RadioGroupDirectionUnion } from '@/types/IRadioGroup'
import { RadioGroupDirection } from '@/enums/RadioGroup'
import type { RadioVariationUnion } from '@/types/IRadio'
import { TitleVariations } from '@/enums'

const emit = defineEmits(['update:modelValue', 'change'])
//@ts-ignore
const props = defineProps({
  modelValue: [String, Number],
  /**
   *  Объект или массив данных
   */
  options: {
    type: [Array as PropType<IRadioGroupOptions>],
    default: () => []
  },
  /**
   *  Заголовок:
   *
   */
  title: {
    type: String,
    default: ''
  },
  /**
   *  Вспомогательный текст под инпутом:
   *
   */
  helpText: {
    type: String,
    default: ''
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
   *  Name
   */
  name: {
    type: String,
    required: true
  },
  /**
   *  Отключенное состояние
   *  всего списка
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   *  Добавление пользовательского
   *  класса к radio
   */
  radioClassName: {
    type: String,
    default: ''
  },
  /**
   *  Направление списка
   *  `column`, `row`
   */
  direction: {
    type: String as () => RadioGroupDirectionUnion,
    default: RadioGroupDirection.Column
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  },
  /**
   * Вариант активного состояния
   * circle - внутри круг
   * checkmark - внутри галочка
   * */
  variation: {
    type: String as () => RadioVariationUnion,
    default: 'circle'
  }
})

const fieldErrors = useFieldErrors(props.errors)

const computedOptions = computed((): object => {
  if (!props.options.length) return []
  return props.options.map((o: IRadioGroupOption, i: number) => {
    const optionData = typeof o === 'object' ? o : ({ label: o, value: o } as IRadioGroupOption)
    const dateNow = Date.now()
    return {
      id: dateNow + i,
      ...optionData,
      disabled: props.disabled || optionData.disabled,
      value: optionData.value,
      modelValue: props.modelValue,
      class: props.radioClassName,
      dir: props.dir,
      variation: props.variation
    }
  })
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    [`mc-field-radio-group--direction-${props.direction}`]: !!props.direction
  }
})

/**
 * Событие по смене выбора
 * @property {event}
 */
const handleInput = (e: string | number): void => {
  fieldErrors.toggleErrorVisible()
  emit('update:modelValue', e)
  emit('change', e)
}

watch(() => props.errors, (value: string[]): void => {
  fieldErrors.setError(value)
})
</script>

<template>
  <div :dir="props.dir" class="mc-field-radio-group" :class="classes">
    <div class="mc-field-radio-group__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title v-if="props.title">{{ props.title }}</mc-title>
      </slot>
    </div>
    <div class="mc-field-radio-group__buttons">
      <mc-field-radio
        v-for="radio in computedOptions"
        :key="radio.id"
        v-bind="radio"
        :name="props.name"
        @update:modelValue="handleInput"
      />
    </div>
    <div v-if="fieldErrors.errorText.value || props.helpText || $slots.footer" class="mc-field-radio-group__footer">
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
      <!-- @slot Слот доп. текста под инпутом -->
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
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/line-heights' as *;
.mc-field-radio-group {
  $block-name: &;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;

    &:empty {
      display: none;
    }
  }

  &__footer {
    line-height: $line-height-150;

    &:empty {
      display: none;
    }
  }

  &--direction {
    &-column {
      #{$block-name}__buttons {
        display: flex;
        flex-direction: column;
        @include child-indent-bottom($space-100);
      }
    }
    &-row {
      #{$block-name}__buttons {
        @include child-indent-right($space-100);
      }
    }
  }
}
</style>
