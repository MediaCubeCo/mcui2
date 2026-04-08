<script setup lang="ts">
import { IMaskComponent, IMask } from 'vue-imask'
import { Spaces } from '@/types/styles/Spaces'
import { computed, type PropType, reactive, ref, useAttrs, watch } from 'vue'
import type { DirectionsUnion } from '@/types/IDirections'
import { Directions } from '@/enums/ui/Directions'
import type { InputTypesUnion, InputValue } from '@/types/IInput'
import { useFieldErrors } from '@/composables/useFieldErrors'
import { InputTypes, Autocomplete } from '@/enums/Input'
import type { IconsListUnion } from '@/types/styles/Icons'
import { type ColorTypes } from '@/types/styles/Colors'
import { useTextareaAutosize } from '@vueuse/core'
import { ButtonSize, ButtonType } from '@/enums/ui/Button'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import { useTheme } from '@/composables/useTheme'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'

const { textarea } = useTextareaAutosize()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'keydown', value: KeyboardEvent): void
  (e: 'copy', value: string): void
}>()
const attrs = useAttrs()
const props = defineProps({
  /**
   *  Значение
   *
   */
  modelValue: {
    type: [String, Number] as PropType<InputValue>,
    default: null
  },
  /**
   *  Тип:
   * `textarea, textarea-autosize и
   * нативные как text, password, email и т.д.`
   *
   * кастомный num - разрешает ввод только цифр и дробных чисел, без ислчений ввиде буквы 'E'
   * кастомный int - разрешает ввод только целочисленных значений
   * кастомный amount_format - форматирует ввод числовых данных разделяя на разряды(1 000 000)
   * date - добавляет placeholder, маску и ограничения ввода
   * uppercase\lowercase - форматирует текст согласну значению (верхний\нижний регистр)
   * phone_number - добавляет '+' к номеру телефона при фокусе без возможности удалить его
   */
  type: {
    type: String as () => InputTypesUnion,
    default: InputTypes.Text
  },

  /**
   *  Заголовок поля:
   *
   */
  title: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Маска поля:
   *
   * tokens - https://imask.js.org/guide.html
   *
   */
  mask: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Вспомогательный текст под инпутом:
   *
   */
  helpText: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Отключенное состояние
   *
   */
  disabled: {
    type: Boolean as PropType<boolean>,
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
   *  Placeholder
   *
   */
  placeholder: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Name
   *
   */
  name: {
    type: String as PropType<string>,
    required: true
  },
  /**
   *  плейсхолдеры для короткого обозначения даты (для маски dd.mm.yyyy)
   *  {
   *      date: 'd',
   *      month: 'm',
   *      year: 'y',
   *  }
   *
   */
  dateMaskPlaceholder: {
    type: Object,
    default: () => ({})
  },
  /**
   *  Максимальная длина строки в инпуте
   *
   */
  maxLength: {
    type: Number as PropType<number>,
    default: null
  },
  /**
   *  textarea-autosize Min height
   *
   */
  minHeight: {
    type: Number as PropType<number>,
    default: null
  },
  /**
   *  textarea-autosize Max height
   *
   */
  maxHeight: {
    type: Number as PropType<number>,
    default: null
  },
  /**
   *  Состояние копирования
   *
   */
  copy: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  /**
   *  Автокомплит введённого ранее текста: on, off
   *
   */
  autocomplete: {
    type: String as () => Autocomplete,
    default: Autocomplete.On
  },

  /**
   *  только чтение текста
   *
   */
  readOnly: {
    type: Boolean as PropType<boolean>,
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
   * Tooltip для кнопка "показать пароль"
   *
   */
  passwordTooltip: {
    type: String as PropType<string>,
    default: 'Show/Hide'
  },

  /**
   * Tooltip для кнопка "Скрыть пароль", если не указывать, то будет аналогичен "показать"
   *
   */
  passwordHideTooltip: {
    type: String as PropType<string>,
    default: null
  },

  /**
   * Очищаем данные от маски на выходе
   */
  clearOutput: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  /**
   * Кастомные настройки для маски
   * См. https://imask.js.org/guide.html
   *
   * Например:
   *  {
   *   autofix: true,
   *    blocks: {
   *      d: {mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2},
   *      m: {mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2},
   *      Y: {mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4}
   *    }
   *  }
   */
  maskOptions: {
    type: Object,
    default: null
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Для какого языка поле ввода
   */
  locale: {
    type: String as PropType<string>,
    default: null
  },
  /**
   * Мобильное ли разрешение
   * (Используется для триггера тултипа в кнопке с паролем)
   */
  isMobile: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Свойство на ограничение количества символов после точки для числовых типов (num || amount_format)
   */
  maxDecimals: {
    type: Number as PropType<number>,
    default: 2
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  },
  width: {
    type: String as PropType<string>,
    default: '100%'
  },
  /**
   * Убираем ли лидирующий 0 01 -> 1 для числовых инпутов num/int/amount_format
   */
  removeLeadingZero: {
    type: Boolean,
    default: true
  },
  /**
   * Разрешаем вводить '-' для числовых типов num/amount_format
   */
  allowNegative: {
    type: Boolean,
    default: false
  }
})

const theme = useTheme('fieldText')
const prettyType = ref<string>(props.type)
const copyIcon = reactive<{ name: IconsListUnion; color: ColorTypes }>({
  name: 'copy',
  color: 'black'
})
const fieldErrors = useFieldErrors(props.errors)

const is_backspace = ref<boolean>(false)

const isRtl = computed((): boolean => {
  return props.dir === Directions.Rtl
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-field-text': true,
    'mc-field-text--error': !!fieldErrors.errorText.value,
    'mc-field-text--textarea': isTextarea.value,
    'mc-field-text--textarea-autosize': isTextareaAutosize.value,
    'mc-field-text--disabled': props.disabled,
    'mc-field-text--copy': props.copy,
    'mc-field-text--rtl': isRtl.value
  }
})

const styles = computed(() => {
  return {
    '--mc-field-text-color': theme.colors[theme.component.color as ColorTypes],
    '--mc-field-text-width': props.width
  }
})

const computedTitle = computed((): string => {
  return `${props.title}${props.required ? ' *' : ''}`
})
const isDate = computed((): boolean => {
  return prettyType.value === InputTypes.Date
})
const isMaskVisible = computed((): boolean => {
  return !!props.mask || !!props.maskOptions || isDate.value
})
const isTextarea = computed((): boolean => {
  return props.type === InputTypes.Textarea
})
const isTextareaAutosize = computed((): boolean => {
  return props.type === InputTypes.TextareaAutosize
})
const textareaAutosizeHeight = computed((): { [key: string]: string } => {
  const min_height = Math.max(props.minHeight, 40)
  const max_height = Math.max(props.maxHeight, min_height)

  return {
    '--textarea-autosize-min-height': `${min_height}px`,
    '--textarea-autosize-max-height': props.maxHeight ? `${max_height}px` : 'auto'
  }
})
const isPassword = computed((): boolean => {
  return props.type === InputTypes.Password
})
const isAmountFormat = computed((): boolean => {
  return props.type === InputTypes.AmountFormat
})
const hasCharCounter = computed((): boolean => {
  return !!props.maxLength && (isTextarea.value || isTextareaAutosize.value)
})
const isPasswordType = computed((): boolean => {
  return prettyType.value === InputTypes.Password
})
const passwordIcon = computed((): IconsListUnion => {
  return isPasswordType.value ? 'visibility_off' : 'visibility'
})
const charCounter = computed((): string | number => {
  return props.modelValue ? String(props.modelValue).length : 0
})
const charCounterTitle = computed((): string => {
  return `${charCounter.value}/${props.maxLength}`
})
const charCounterColor = computed((): ColorTypes => {
  return props.maxLength < +charCounter.value ? 'red' : 'dark-gray'
})
const dateMask = computed((): object => {
  return {
    mask: Date,
    autofix: true,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: props.dateMaskPlaceholder.date || 'd',
        from: 1,
        to: 31,
        maxLength: 2
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: props.dateMaskPlaceholder.month || 'm',
        from: 1,
        to: 12,
        maxLength: 2
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: props.dateMaskPlaceholder.year || 'y',
        from: 1900,
        to: 2999,
        maxLength: 4
      }
    }
  }
})
const maskInputAttrs = computed((): object => {
  return {
    ...inputAttrs.value,
    mask: props.mask,
    lazy: false,
    overwrite: false,
    unmask: props.clearOutput,
    definitions: {
      '#': /./
    },
    readonly: props.readOnly,
    maxlength: props.maxLength,
    type: 'tel',
    ...attrs,
    ...(props.maskOptions ?? {}),
    ...(isDate.value ? dateMask.value : {})
  }
})

const computedValue = computed({
  get() {
    if (isAmountFormat.value && !isRtl.value) {
      return getAmountFormat(String(props.modelValue))
    } else return props.modelValue
  },
  set(value: string) {
    fieldErrors.toggleErrorVisible()
    emit('update:modelValue', value)
  }
})

const handleInput = (e: Event): void => {
  computedValue.value = getPreparedInputValue(e) as string
}
const inputAttrs = computed((): object => {
  return {
    style: inputStyles.value,
    placeholder: props.placeholder,
    disabled: props.disabled,
    name: props.name,
    'field-id': props.name,
    autocomplete: props.autocomplete,
    tabindex: props.tabindex,
    ...attrs,
    class: ['mc-field-text__input', attrs.class || ''].join(' ')
  }
})
const inputStyles = computed((): object => {
  let bottomStyle = {}
  if (isTextarea.value || isTextareaAutosize.value) {
    const spaceBottomToken = hasCharCounter.value ? '400' : '150'
    const spaceBottomValue = Spaces[spaceBottomToken]
    bottomStyle = { paddingBottom: `${parseInt(spaceBottomValue) - 1}px` }
  }
  return {
    ...(!isTextarea.value && !isTextareaAutosize.value ? { boxSizing: 'border-box' } : {}),
    ...bottomStyle
  }
})

const setDecimalsLimit = (val: string): string => {
  if (val && props.maxDecimals) {
    const [integerPart, decimalPart] = val.split('.')
    if (decimalPart?.length > props.maxDecimals) {
      return `${integerPart}.${decimalPart.slice(0, props.maxDecimals)}`
    }
  }
  return val
}
/**
 * Remove leading zero from input if length > 1 && number isn't decimal
 * */
const handleRemoveLeadingZero = (val: string): string => {
  if (!props.removeLeadingZero) return val

  let result = val
  const [first_char] = val || []
  if (val.length > 1 && +first_char === 0 && val.indexOf('.') === -1) result = val.slice(1)
  return result
}
const getPreparedInputValue = (e: Event): InputValue => {
  if(!e) return props.modelValue

  const target = e.target as HTMLInputElement
  let value: InputValue = isDate.value && target && target.value ? target.value?.substring(0, 10) : target.value
  const { start: cursor_position } = getCaretPos(target)
  let prepared_value = formattedToNumber(value)

  switch (props.type) {
    case InputTypes.Num: {
      //eslint-disable-next-line
      const prep_val = value?.replace(/,/g, '.')?.replace(/ /g, '')
      let [num] = /-?\d*[\.]?\d*/.exec(String(prep_val)) || []
      num = setDecimalsLimit(num as string)
      num = handleRemoveLeadingZero(num)
      value = String(num)
      target.value = String(num)
      break
    }
    case InputTypes.Int: {
      let [int] = /-?\d*/.exec(String(target.value)) || []
      int = handleRemoveLeadingZero(int as string)
      value = String(int)
      target.value = String(int)
      break
    }
    case InputTypes.AmountFormat: {
      value = value?.replace(/,/g, '.')?.replace(/ /g, '')
      value = setDecimalsLimit(value)
      value = handleRemoveLeadingZero(value)
      prepared_value = formattedToNumber(value)

      const float_value = parseFloat(prepared_value)
      const without_spaces_value = prepared_value.replace(/ /gm, '')

      value = prepared_value
        ? String(float_value) === without_spaces_value
          ? float_value
          : without_spaces_value || float_value || prepared_value
        : null
      const formatted_value = getAmountFormat(prepared_value)
      target.value = isRtl.value ? formatted_value.replace(/ /gm, '') : formatted_value
      const space_length = target.value?.slice(0, cursor_position).replace(/[^ ]/gm, '')?.length || 0
      const caret_after_format = cursor_position + space_length
      if (Number.isFinite(cursor_position) && Number.isFinite(caret_after_format)) {
        scheduleCaretPos(target, caret_after_format, caret_after_format)
      }
      break
    }
    case InputTypes.Uppercase: {
      value = value?.toUpperCase()
      target.value = value
      if (Number.isFinite(cursor_position)) {
        scheduleCaretPos(target, cursor_position, cursor_position)
      }
      break
    }
    case InputTypes.Lowercase: {
      value = value?.toLowerCase()
      target.value = value
      if (Number.isFinite(cursor_position)) {
        scheduleCaretPos(target, cursor_position, cursor_position)
      }
      break
    }
    case InputTypes.Password:
      value = value?.replace(/ /gm, '')
      target.value = value
      if (Number.isFinite(cursor_position)) {
        scheduleCaretPos(target, cursor_position, cursor_position)
      }
      break
    case InputTypes.PhoneNumber:
      if (value.length === 0) value = '+'
      if (value.charAt(0) !== '+') value = '+' + value
      value = value.replace(/(?!^)\D/g, '')
      target.value = value
      break
  }

  return value
}

const prepareHandleKeyDown = (e: KeyboardEvent): void => {
  switch (props.type) {
    case InputTypes.AmountFormat:
    case InputTypes.Num: {
      is_backspace.value = !!e.key?.match(/Backspace/)
      const is_space = e.code?.match(/Space/)

      const excluded_symbols = ['.', ',']
      props.allowNegative && excluded_symbols.push('-')
      const is_excluded_symbol = excluded_symbols.includes(e.key)
      const is_ctrl_pressed = e.metaKey || e.ctrlKey
      const is_allowed_symbol = e.key?.match(/Arrow|Backspace|\.,/)

      if ((isNaN(+e.key) && !is_allowed_symbol && !is_excluded_symbol && !is_ctrl_pressed) || is_space) {
        e.preventDefault()
      }

      const already_has_symbol =
        typeof props.modelValue === 'string' &&
        excluded_symbols.some((symbol) => String(props.modelValue)?.includes(symbol))

      if (is_excluded_symbol && already_has_symbol) {
        e.preventDefault()
      }
      break
    }
  }
  emit('keydown', e)
}

const formattedToNumber = (value: string): string => {
  if (!value) return value as string
  //eslint-disable-next-line
  const [first] = /-?\d*[\.]?\d*/.exec(String(value)?.replace(/ /gm, '')?.trim()) || []

  return first as string
}

const setCaretPos = (ctrl: HTMLInputElement, start: number, end: number): void => {
  if (!ctrl.setSelectionRange) return

  let s = Number(start)
  let e = Number(end)
  if (!Number.isFinite(s) || !Number.isFinite(e)) return

  const len = ctrl.value.length
  s = Math.max(0, Math.min(s, len))
  e = Math.max(0, Math.min(e, len))

  if (ctrl.selectionStart === s && ctrl.selectionEnd === e) return

  try {
    if (typeof document !== 'undefined' && document.activeElement !== ctrl) {
      ctrl.focus()
    }
    ctrl.setSelectionRange(s, e)
  } catch {
    /* InvalidStateError (readonly / type mismatch) */
  }
}

const scheduleCaretPos = (ctrl: HTMLInputElement, start: number, end: number): void => {
  const run = () => setCaretPos(ctrl, start, end)
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(run)
  } else {
    run()
  }
}

const getCaretPos = (ctrl: HTMLInputElement) => {
  if (typeof ctrl.selectionStart === 'number' && typeof ctrl.selectionEnd === 'number') {
    return { start: ctrl.selectionStart, end: ctrl.selectionEnd }
  }
  return { start: 0, end: 0 }
}

const getAmountFormat = (value: string): string => {
  const formatted_number = formattedToNumber(value)
  const has_fraction = !!String(formatted_number)?.match(/\./)

  const [int, fraction] = String(formatted_number)
    //eslint-disable-next-line
    .replace(/[^\d\.-]/g, '')
    .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
    .split('.')

  const formatted_values = [int, fraction?.replace(/ /gm, '') || '']
  if (has_fraction) {
    return formatted_values.join('.')
  }
  return formatted_values.filter((v) => !!v).join('.')
}

const handlerCopy = (): void => {
  try {
    navigator.clipboard.writeText(props.modelValue as string)
    copyIcon.name = 'check'
    copyIcon.color = 'green'
    setTimeout(() => {
      copyIcon.name = 'copy'
      copyIcon.color = 'black'
    }, 2000)
  } catch (e) {
    console.error('error while copy with navigator', e)
  }
  /**
   * Событие по кнопке копирования
   */
  emit('copy', props.modelValue as string)
}

const togglePasswordVisibility = (): void => {
  prettyType.value = isPasswordType.value ? InputTypes.Text : InputTypes.Password
}
watch(
  () => props.errors,
  (value: string[]): void => {
    fieldErrors.setError(value)
  }
)
const handleFocus = (e: MouseEvent): void => {
  if (!e) return

  const target: HTMLElement = e.target as HTMLElement
  if (!target) return

  const targetElements: string[] = ['input', 'textarea']
  if (!targetElements.includes(target.tagName?.toLowerCase())) {
    const root: HTMLElement | null = target.closest('.mc-field-text')
    if (!root) return

    const el: HTMLElement | null = root.querySelector(`.mc-field-text__input`)
    if (!el) return

    el.focus()
  }
  return
}
</script>

<template>
  <div :dir="props.dir" :class="classes" :style="styles" @click.stop="handleFocus">
    <label :for="name" class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title v-if="title" max-width="100%" :weight="Weights.Medium">
          {{ computedTitle }}
        </mc-title>
      </slot>
    </label>
    <label :for="name" class="mc-field-text__inner">
      <div class="mc-field-text__main">
        <div v-if="$slots.prepend" class="mc-field-text__prepend" @click.stop>
          <!-- @slot Слот в начале инпута -->
          <slot name="prepend" />
        </div>
        <div class="mc-field-text__input-wrapper">
          <textarea
            v-if="isTextarea"
            :value="computedValue"
            v-bind="inputAttrs"
            :maxlength="maxLength"
            rows="1"
            @input="handleInput"
          />
          <div
            v-else-if="isTextareaAutosize"
            class="mc-field-text--textarea-autosize_wrapper"
            :style="textareaAutosizeHeight"
          >
            <span class="mc-field-text--textarea-autosize_backdrop-cover" v-bind="inputAttrs">{{ computedValue }}</span>
            <textarea :value="computedValue" v-bind="inputAttrs" @input="handleInput" />
          </div>
          <template v-else>
            <!-- When possible, prefer to use input type="tel" to avoid glitch on android devices -->
            <i-mask-component
              v-if="isMaskVisible"
              :value="computedValue"
              v-bind="maskInputAttrs"
              @keydown="prepareHandleKeyDown"
              @update:modelValue="(v: string, e: Event) => handleInput(e)"
            />
            <input
              v-else
              :value="computedValue"
              v-bind="inputAttrs"
              :type="prettyType"
              :readonly="props.readOnly"
              :maxlength="maxLength"
              @keydown="prepareHandleKeyDown"
              @input="handleInput"
            />
          </template>
        </div>
        <div
          v-if="$slots.append || copy || isPassword"
          class="mc-field-text__append"
          :class="{ 'mc-field-text__append--indent-bottom': hasCharCounter }"
          @click.stop
        >
          <!-- @slot Слот в конце инпута -->
          <slot name="append" />
          <mc-button v-if="copy" variation="black-link" :size="ButtonSize.MCompact" @click.stop.prevent="handlerCopy">
            <template #icon-append>
              <mc-svg-icon :name="copyIcon.name" :color="copyIcon.color" />
            </template>
          </mc-button>
          <mc-tooltip
            v-if="isPassword"
            :content="isPasswordType ? props.passwordTooltip : props.passwordHideTooltip || props.passwordTooltip"
          >
            <mc-button
              variation="black-link"
              :size="ButtonSize.MCompact"
              tabindex="-1"
              :type="ButtonType.Button"
              @click.stop.prevent="togglePasswordVisibility"
            >
              <template #icon-append>
                <mc-svg-icon :name="passwordIcon" />
              </template>
            </mc-button>
          </mc-tooltip>
        </div>
        <mc-title
          v-if="hasCharCounter"
          class="mc-field-text__char-counter"
          :variation="TitleVariations.Overline"
          :text-align="HorizontalAlignment.Right"
          :color="charCounterColor"
        >
          {{ charCounterTitle }}
        </mc-title>
      </div>
      <div v-if="$slots.right" class="mc-field-text__right">
        <!-- @slot Слот справа инпута -->
        <slot name="right" />
      </div>
    </label>
    <div v-if="fieldErrors.errorText.value || props.helpText || $slots.footer" class="mc-field-text__footer">
      <mc-title
        v-if="fieldErrors.errorText.value"
        tag-name="div"
        color="red"
        :variation="TitleVariations.Overline"
        class="mc-field-text__error-text"
        :html-data="fieldErrors.errorText.value"
      />
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

<style lang="scss" src="./index.scss"></style>
