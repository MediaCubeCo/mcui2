<script setup lang="ts">
import { computed, onMounted, type PropType, reactive, ref, useAttrs, watch } from 'vue'
import {
  DatepickerFormat,
  DatepickerTypes,
  DayjsFormat,
  DatepickerOutputFormat,
  DatepickerFormatsVariations
} from '@/enums/Datepicker'
import type {
  DatepickerFormatsObjectFormat,
  IDatepickerPlaceholders,
  IDatepickerPreset
} from '@/types/IDatepicker'
import {
  type DatePickerValue,
  type DatepickerTypesUnion,
  type DatepickerFormatsObject,
} from '@/types/IDatepicker'
//@ts-ignore
import { dayjs, dayjsLocales } from '../../../utils/dayjs.js'
import DatePicker, { type DatePickerMarker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import McTitle from '../McTitle/McTitle.vue'
import McSvgIcon from '../McSvgIcon/McSvgIcon.vue'
import McButton from '../McButton/McButton.vue'
import { useFieldErrors } from '@/composables/useFieldErrors'

const attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  //@ts-ignore
  modelValue: {
    type: [String, Array] as PropType<DatePickerValue>
  },
  /**
   *  Тип датапикера
   */
  type: {
    type: String as () => DatepickerTypesUnion,
    default: DatepickerTypes.DatePicker
  },
  /**
   *  Заголовок поля:
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },

  /**
   *  Вспомогательный текст под инпутом:
   */
  helpText: {
    type: String as PropType<string>,
    default: ''
  },

  /**
   *  Редактируемый инпут
   */
  editable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placeholder: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Name
   */
  name: {
    type: String as PropType<string>,
    required: true
  },

  /**
   *  Локаль The locale code (ISO 639-1 + optional country code)
   */
  lang: {
    type: String as PropType<string>,
    default: 'en'
  },
  /**
   *  Ошибки
   */
  errors: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   *  Отдаваемая дата будет в формате ISO String
   */
  toIsoFormat: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Формат отдаваемой даты
   */
  placeholders: {
    type: Object as IDatepickerPlaceholders,
    default: () => ({
      week: 'Week',
      month: 'Month',
      quarter: 'Quarter',
      year: 'Year',
      confirm: 'Confirm'
    })
  },
  /**
   * Пресеты для быстрых периодов
   **/
  customPresets: {
    type: Array as PropType<IDatepickerPreset[]>,
    default: () => []
  },
  range: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Если значение true, то датапикер отображается в открытом виде
   */
  inline: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Дата, до которой все будет задизэйблено
   **/
  minDate: {
    type: [Date, String] as PropType<Date | string>
  },
  /**
   * Дата, после которой все будет задизэйблено
   **/
  maxDate: {
    type: [String, Date] as PropType<Date | string>
  },
  /**
   * Массив дат запрещенных к выбору / Метод которые проверяет каждую дату
   **/
  disabledDates: {
    type: [Array as PropType<Date[] | string[]>, Function]
  },
  /**
   * Массив дат разрешенных к выбору / Метод которые проверяет каждую дату
   * **/
  allowedDates: {
    type: [Array as PropType<Date[] | string[]>, Function]
  },
  /**
   * Функция проверяющая и устанавливающая доступно ли время для выбора
   * Params [String] date - текущая дата
   * return Boolean, где true - время заблокировано для выбора
   * **/
  disabledTime: {
    type: [Array as PropType<Date[] | string[]>, Function]
  },
  minWidth: {
    type: String as PropType<string>,
    default: '240px'
  },
  hours: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  minutes: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  seconds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  timezone: {
    type: String as PropType<string>,
    default: dayjs.tz.guess()
  },
  useTimezone: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Показывать ли крестик очищения поля
   * */
  clearable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  setDefaultToday: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  markers: {
    type: Array as () => DatePickerMarker[],
    default: () => [] as DatePickerMarker[]
  }
})

const fieldErrors = useFieldErrors(props.errors)
const pickDate = ref<DatePickerValue>(null)
const input = ref<InstanceType<typeof DatePicker> | null | any>(null)

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-date-picker--error': !!fieldErrors.errorText.value,
    'mc-date-picker--disabled': props.disabled
  }
})

const formats = reactive<DatepickerFormatsObject>({
  [DatepickerTypes.TimePicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.TimePicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.TimePicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.TimePicker
  },
  [DatepickerTypes.DatePicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.DatePicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.DatePicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.DatePicker
  },
  [DatepickerTypes.DateTimePicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.DateTimePicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.DateTimePicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.DateTimePicker
  },
  [DatepickerTypes.WeekPicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.WeekPicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.WeekPicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.WeekPicker
  },
  [DatepickerTypes.MonthPicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.MonthPicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.MonthPicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.MonthPicker
  },
  [DatepickerTypes.YearPicker]: {
    [DatepickerFormatsVariations.Picker]: DatepickerFormat.YearPicker,
    [DatepickerFormatsVariations.Dayjs]: DayjsFormat.YearPicker,
    [DatepickerFormatsVariations.Output]: DatepickerOutputFormat.YearPicker
  }
})
const computedType = computed((): DatepickerTypes => {
  return (props.type as DatepickerTypes) || DatepickerTypes.DatePicker
})
const dateFormat = reactive<DatepickerFormatsObjectFormat>(formats[computedType.value])

const isTimePicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.TimePicker
})
const isDateTimePicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.DateTimePicker
})
const isWeekPicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.WeekPicker
})
const isMonthPicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.MonthPicker
})
const isYearPicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.YearPicker
})
const pickerType = computed((): Partial<Record<DatepickerTypes, boolean>> => {
  return {
    [DatepickerTypes.TimePicker]: computedType.value === DatepickerTypes.TimePicker,
    [DatepickerTypes.WeekPicker]: computedType.value === DatepickerTypes.WeekPicker,
    [DatepickerTypes.MonthPicker]: computedType.value === DatepickerTypes.MonthPicker,
    [DatepickerTypes.YearPicker]: computedType.value === DatepickerTypes.YearPicker
  }
})
const isAutoApply = computed((): boolean => {
  return !isTimePicker.value && !isDateTimePicker.value && !isFooterVisible.value
})
const weekNumbers = computed((): string | null => {
  return isWeekPicker.value ? 'local' : null
})
const modelType = computed((): string => {
  return props.toIsoFormat && !props.useTimezone ? 'iso' : 'format'
})
const hoursOptions = computed((): object => {
  return props.hours && props.hours.length ? { 'hour-options': props.hours } : {}
})
const minutesOptions = computed((): object => {
  return props.minutes && props.minutes.length ? { 'minute-options': props.minutes } : {}
})
const secondsOptions = computed((): object => {
  return props.seconds && props.seconds.length ? { 'second-options': props.seconds } : {}
})
const isFooterVisible = computed((): boolean => {
  return (
    props.range &&
    (props.customPresets?.length || !!props.placeholders) &&
    !isTimePicker.value &&
    !isYearPicker.value &&
    !isMonthPicker.value
  )
})

const localValue = computed({
  get() {
    return getFormattedPickerDate(props.modelValue)
  },
  set(value) {
    if (!value) value = props.range ? [] : null
    const date = getFormattedOutputDate(value)
    fieldErrors.toggleErrorVisible()
    emit('update:modelValue', date)
  }
})

onMounted(() => {
  init()
})

const init = () => {
  props.setDefaultToday && handlePreselectToday()
}

const handlerPreselectRange = (period: string[]): void => {
  const [start, end] = period
  input.value &&
    (input.value.currentValue = dayjs ? [dayjs(start).toDate(), dayjs(end).toDate()] : period)
}

/**
 * Преселект при setDefaultToday = true
 * */
const handlePreselectToday = (): void => {
  if (isWeekPicker.value) return

  const hasValue = props.range
    ? localValue.value?.length &&
      Array.isArray(localValue.value) &&
      localValue.value.every((v) => dayjs(v).isValid())
    : dayjs(localValue.value).isValid()

  if (!hasValue) {
    let today = props.toIsoFormat ? dayjs().toISOString() : dayjs().format(dateFormat[DatepickerFormatsVariations.Output])
    localValue.value = props.range
      ? getFormattedPickerDate([today, today])
      : getFormattedPickerDate(today)
  }
}

/**
 * Prepare dates for datepicker
 * */
const getFormattedPickerDate = (value: DatePickerValue): DatePickerValue => {
  if (isWeekPicker.value) return value
  let preparedValue = props.range ? (Array.isArray(value) ? value : []) : [value]
  if (!props.toIsoFormat) {
    preparedValue = preparedValue.map((pv) => dayjs(pv, dateFormat.output).format(dateFormat.dayjs))
  }

  const [start, end] = preparedValue
  return props.range ? [start, end].filter(Boolean) as DatePickerValue : start
}

/**
 * Prepare dates for output
 * */
const getFormattedOutputDate = (value: DatePickerValue): DatePickerValue => {
  if (isWeekPicker.value) return value
  let preparedValue = props.range
    ? Array.isArray(value)
      ? value.map((pv) => String(pv))
      : []
    : [String(value)]
  if (!props.toIsoFormat) {
    preparedValue = preparedValue.map((pv) => dayjs(pv, dateFormat.dayjs).format(dateFormat.output))
  }

  const [start, end] = preparedValue.map((pv) => (pv === 'Invalid Date' ? null : pv))
  return props.range ? [start, end].filter(Boolean) as DatePickerValue : start
}

const setLocale = async (): Promise<void> => {
  const locale =
    props.lang !== 'ar' && Object.keys(dayjsLocales).includes(props.lang) ? props.lang : 'en'
  await dayjsLocales[locale]?.()
  dayjs.locale(locale)
}

const selectPeriod = (key: string) => {
  let start = dayjs()
  const end = pickDate.value ? dayjs(pickDate.value) : dayjs()
  switch (key) {
    case 'week':
      start = dayjs(end).subtract(7, 'days')
      break
    case 'month':
      start = dayjs(end).subtract(1, 'months')
      break
    case 'quarter':
      start = dayjs(end).subtract(3, 'months')
      break
    case 'year':
      start = dayjs(end).subtract(1, 'years')
      break
  }
  input.value.updateInternalModelValue([start.toDate(), end.toDate()])
}
const handlePickDate = (date: DatePickerValue) => {
  pickDate.value = date
}

const handleSubmit = () => {
  input.value.selectDate()
  input.value.closeMenu()
}

watch(
  () => props.lang,
  () => {
    setLocale()
  },
  { immediate: true }
)
</script>

<template>
  <div ref="field" class="mc-date-picker" :class="classes">
    <label v-if="$slots.header || !!props.title" :for="name" class="mc-date-picker__header">
      <!-- @slot Слот для заголовка над инпутом -->
      <slot name="title">
        <mc-title v-if="props.title" weight="medium">{{ props.title }}</mc-title>
      </slot>
    </label>
    <div class="mc-date-picker__inner">
      <div class="mc-date-picker__input-wrapper" :style="{ minWidth }">
        <date-picker
          v-model="localValue"
          ref="input"
          :type="type"
          v-bind="{
            ...attrs,
            ...pickerType,
            ...hoursOptions,
            ...minutesOptions,
            ...secondsOptions
          }"
          class="mc-date-picker__date-picker"
          :range="props.range"
          :multi-calendars="props.range"
          :month-change-on-scroll="false"
          :timezone="timezone"
          :format="dateFormat.picker"
          :model-type="modelType"
          :auto-apply="isAutoApply"
          :partial-flow="isTimePicker || isDateTimePicker"
          :enable-time-picker="isTimePicker || isDateTimePicker"
          :clearable="clearable"
          :inline="inline"
          :locale="lang"
          :markers="markers"
          :action-row="{}"
          :loading="loading"
          :week-numbers="weekNumbers"
          :placeholder="placeholder"
          :editable="editable"
          :disabled="disabled"
          :disabled-dates="disabledDates"
          :allowed-dates="allowedDates"
          :min-date="minDate"
          :max-date="maxDate"
          :disabled-times="disabledTime"
          @range-start="handlePickDate"
        >
          <!-- @slot Слот для вставки в футер попапа календаря -->
          <template v-if="isFooterVisible" #action-row>
            <div class="mc-datepicker__footer-popup">
              <div class="mc-datepicker__footer-popup-periods">
                <template v-if="customPresets && customPresets.length">
                  <mc-button
                    v-for="preset in customPresets"
                    :key="preset.title"
                    variation="black-link"
                    secondary-color="purple"
                    @click="handlerPreselectRange(preset.period)"
                  >
                    {{ preset.title }}
                  </mc-button>
                </template>
                <template v-else>
                  <mc-button
                    v-if="placeholders.week"
                    variation="black-link"
                    secondary-color="purple"
                    @click="selectPeriod('week')"
                  >
                    {{ placeholders.week }}
                  </mc-button>
                  <mc-button
                    v-if="placeholders.month"
                    variation="black-link"
                    secondary-color="purple"
                    @click="selectPeriod('month')"
                  >
                    {{ placeholders.month }}
                  </mc-button>
                  <mc-button
                    v-if="placeholders.quarter"
                    variation="black-link"
                    secondary-color="purple"
                    @click="selectPeriod('quarter')"
                  >
                    {{ placeholders.quarter }}
                  </mc-button>
                  <mc-button
                    v-if="placeholders.year"
                    variation="black-link"
                    secondary-color="purple"
                    @click="selectPeriod('year')"
                  >
                    {{ placeholders.year }}
                  </mc-button>
                </template>
              </div>
              <mc-button
                v-if="placeholders.confirm"
                variation="purple-outline"
                size="xs"
                @click="handleSubmit"
              >
                {{ placeholders.confirm }}
              </mc-button>
            </div>
          </template>
          <template #input-icon>
            <mc-svg-icon
              name="calendar"
              size="300"
              :color="props.disabled ? 'outline-gray' : 'black'"
            />
          </template>
          <template v-if="$slots.header" #header>
            <div>
              <!-- @slot Слот для вставки в хедер попапа календаря -->
              <slot name="header" />
            </div>
          </template>
          <template v-if="$slots.sidebar" #sidebar>
            <div>
              <!-- @slot Слот для вставки в сайдбар попапа календаря  -->
              <slot name="sidebar" />
            </div>
          </template>
          <!-- @slot Слот для вставки пользовательской иконки календаря -->
          <template #icon-calendar>
            <mc-svg-icon class="mc-date-picker__icon" name="calendar" />
          </template>
        </date-picker>
      </div>
    </div>
    <div
      v-if="!!fieldErrors.errorText.value || !!props.helpText || !!$slots.bottom"
      class="mc-date-picker__footer"
    >
      <mc-title
        v-if="!!fieldErrors.errorText.value"
        tag-name="div"
        color="red"
        variation="overline"
      >
        {{ fieldErrors.errorText.value }}
      </mc-title>
      <br v-if="!!fieldErrors.errorText.value && (!!props.helpText || !!$slots.bottom)" />
      <!-- @slot Слот для доп. текста под инпутом -->
      <slot name="bottom">
        <mc-title v-if="!!props.helpText" tag-name="div" variation="overline">
          {{ props.helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
//More info https://vue3datepicker.com/installation/
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/font-families';
@import '../../../assets/tokens/box-shadows';
@import '../../../assets/tokens/spacings';
@import '../../../assets/tokens/sizes';
@import '../../../assets/tokens/font-sizes';
@import '../../../assets/tokens/line-heights';
@import '../../../assets/tokens/colors';
@import '../../../assets/tokens/font-weights';
@import '../../../assets/tokens/media-queries';
.mc-date-picker {
  $block-name: &;
  display: block;
  font-family: $font-family-main;
  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;
    &:empty {
      display: none;
    }
  }
  &__inner {
    display: flex;
    align-items: center;
  }
  &__input-wrapper {
    width: 100%;
    .dp__input {
      font-family: $font-family-main;
      font-size: $font-size-200;
      line-height: $line-height-200;
      height: $size-500;
      padding: $space-100 $space-300 $space-100 36px;
      border-color: $color-outline-gray;
      border-radius: $radius-100;
      cursor: pointer;
      color: $color-black;
      &:hover,
      &:focus {
        border-color: $color-purple;
      }
      &::placeholder {
        color: $color-gray;
      }
    }
  }
  &__footer {
    margin-top: $space-50;
    &:empty {
      display: none;
    }
  }
  .dp__input {
    font-family: $font-family-main;
    font-size: $font-size-200;
    line-height: $line-height-200;
    height: $size-500;
    padding: $space-100 $space-300 $space-100 36px;
    border-color: $color-outline-gray;
    border-radius: $radius-100;
    cursor: pointer;
    color: $color-black;
    &:hover,
    &:focus {
      border-color: $color-purple;
    }
    &::placeholder {
      color: $color-gray;
    }
  }

  &--error {
    .dp__input {
      border-color: $color-red !important;
    }
  }
  &--disabled {
    .dp__input {
      color: $color-outline-gray;
      cursor: not-allowed;
      background-color: $color-hover-gray;
      border-color: $color-outline-gray;
      box-shadow: none;
      &:hover,
      &:focus {
        border-color: $color-outline-gray;
      }
    }
  }
  // Input to top
  // Calendar below
  .dp + .dp {
    border-left: none;
  }
  .dp {
    width: 256px;
    padding: $space-200;
    font-size: $font-size-200;
    &--header-wrap {
      margin-bottom: $space-200;
    }
    &__month_year_wrap {
      justify-content: center;
    }
    &__month_year_select {
      font-size: $font-size-200;
      line-height: $line-height-200;
      font-weight: $font-weight-semi-bold;
      color: $color-black;
      width: max-content;
      height: auto;
    }
    &__input_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      left: 8px;
    }
    &--clear-btn {
      margin-right: $space-100;
      svg {
        padding: 0;
      }
      &:hover {
        svg {
          color: $color-black;
        }
      }
    }
    &__calendar {
      &_item {
        flex-grow: unset;
        .dp {
          &__cell_inner {
            @include size($size-400);
            font-size: $font-size-200;
            line-height: $line-height-200;
            font-weight: $font-weight-normal;
            color: $color-black;
            border-radius: $radius-100;
            &:hover {
              color: $color-purple;
              background-color: fade-out($color-purple, 0.8);
              border-radius: $radius-100;
            }
          }
          &__cell_disabled {
            background-color: $color-hover-gray !important;
            border-radius: 0 !important;
          }
          &__cell_offset {
            color: $color-hover-gray;
          }
          &__range_between {
            color: $color-black;
            background-color: fade-out($color-purple, 0.9);
            border-radius: 0;
          }
          &__range_start,
          &__range_end,
          &__active_date {
            color: $color-white !important;
            background-color: $color-purple !important;
            border-color: $color-purple !important;
          }
          &__active_date {
            box-shadow: $shadow-s-purple;
          }
          &__today {
            color: $color-purple;
            border-color: transparent;
            border-radius: $radius-100;
          }
        }
      }
      &_header {
        &_item {
          @include size($space-400);
          font-size: $font-size-200;
          line-height: $line-height-200;
          font-weight: $font-weight-normal;
          color: $color-dark-gray;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &_separator {
          display: none;
        }
      }
      &_row {
        margin: 0;
      }
    }
    &__btn {
      font-size: $font-size-200;
      line-height: $line-height-200;
      font-weight: $font-weight-semi-bold;
      background: transparent;
      &:hover {
        color: $color-purple;
      }
    }
    &__menu {
      border-radius: $radius-150;
      box-shadow: $shadow-s;
      z-index: 12222;
      border: transparent;
      padding: $space-200;
      &_inner {
        padding: 0;
      }
    }
    &__arrow_top,
    &__arrow_bottom,
    &__arrow_left,
    &__arrow_right {
      border: none;
      box-shadow: $shadow-s;
      z-index: -1;
    }
    &__action_row {
      padding: 0;
      margin: 0;
      .mc-datepicker__footer-popup {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        &-periods {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @include child-indent-right($space-200);
          > * {
            @include child-indent-right($space-300);
          }
          .mc-button {
            @include child-indent-right($space-zero);
          }
        }
      }
    }
  }
  @at-root {
    html[dir='rtl'] {
      .mx-icon {
        &-double {
          &-right:after {
            left: $space-100;
          }
          &-left:before {
            left: -$space-100;
          }
        }
      }
    }
  }
}
</style>
