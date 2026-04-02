<script setup lang="ts">
import { computed, onMounted, type PropType, ref, useAttrs, watch } from 'vue'
import { DatepickerFormat, DatepickerTypes, DatepickerOutputFormat } from '@/enums/Datepicker'
import type { IDatepickerPlaceholders, IDatepickerPreset } from '@/types/IDatepicker'
import { type DatePickerValue, type DatepickerTypesUnion } from '@/types/IDatepicker'
import { default as DatePicker, type DatePickerMarker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useFieldErrors } from '@/composables/useFieldErrors'
import { ButtonSize } from '@/enums/ui/Button'
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types/styles/Colors'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import {
  addCalendarDays,
  addCalendarMonths,
  addCalendarYears,
  coercePickDateToDate,
  formatNowAsOutput,
  formatSegmentMc,
  getDefaultTimeZone,
  isValidDateish,
  langToDateFnsLocale,
  outputToPicker,
  parsePresetYmdToDate,
  pickerToOutput,
  type McFormatPair
} from './McDatepicker.calendar'

const default_placeholders: IDatepickerPlaceholders = {
  week: 'Week',
  month: 'Month',
  quarter: 'Quarter',
  year: 'Year',
  confirm: 'Confirm'
}

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
    type: Function as PropType<(date: Date) => boolean>
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
    default: '140px'
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
    default: () => getDefaultTimeZone()
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
  },
  hideCalendarIcon: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Рендерить ли календарь в ином месте (props.teleportTo) body - default
   * */
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // acceptable - tag name, or id (#id)
  teleportTo: {
    type: String as PropType<string>,
    default: 'body'
  }
})
const theme = useTheme('datepicker')
const fieldErrors = useFieldErrors(props.errors)
const pickDate = ref<DatePickerValue | Date | null>(null)
const input = ref<InstanceType<typeof DatePicker> | null | any>(null)
// ref для года, который сейчас показан в month-picker
const month_picker_view_year = ref(new Date().getFullYear())

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-date-picker--error': !!fieldErrors.errorText.value,
    'mc-date-picker--disabled': props.disabled,
    'mc-date-picker--without-icon': props.hideCalendarIcon
  }
})
/** Локально для .mc-date-picker и потомков; без побочных эффектов (SSR-safe). */
const pickerInlineStyles = computed((): { [key: string]: string } => {
  return {
    '--mc-date-picker-color': theme.colors[theme.component.color as ColorTypes]
  }
})

/**
 * Телепорт календаря в body: .dp читает var с :root. Только на клиенте (SSR: document нет).
 */
watch(
  () => theme.colors[theme.component.color as ColorTypes],
  (color) => {
    if (typeof document === 'undefined') return
    document.documentElement.style.setProperty('--mc-date-picker-color', color)
  },
  { immediate: true }
)

const formats: Record<DatepickerTypes, McFormatPair> = {
  [DatepickerTypes.TimePicker]: {
    picker: DatepickerFormat.TimePicker,
    output: DatepickerOutputFormat.TimePicker
  },
  [DatepickerTypes.DatePicker]: {
    picker: DatepickerFormat.DatePicker,
    output: DatepickerOutputFormat.DatePicker
  },
  [DatepickerTypes.DateTimePicker]: {
    picker: DatepickerFormat.DateTimePicker,
    output: DatepickerOutputFormat.DateTimePicker
  },
  [DatepickerTypes.WeekPicker]: {
    picker: DatepickerFormat.WeekPicker,
    output: DatepickerOutputFormat.WeekPicker
  },
  [DatepickerTypes.MonthPicker]: {
    picker: DatepickerFormat.MonthPicker,
    output: DatepickerOutputFormat.MonthPicker
  },
  [DatepickerTypes.YearPicker]: {
    picker: DatepickerFormat.YearPicker,
    output: DatepickerOutputFormat.YearPicker
  }
}

const computedType = computed((): DatepickerTypes => {
  return (props.type as DatepickerTypes) || DatepickerTypes.DatePicker
})
const dateFormat = computed((): McFormatPair => formats[computedType.value])
const calendarContext = computed(() => ({
  locale: props.lang,
  timeZone: props.timezone,
  useTimezone: props.useTimezone
}))
const dateFnsFormatLocale = computed(() => langToDateFnsLocale(props.lang))

function formatSegmentForPicker(pv: unknown, direction: 'inbound' | 'outbound'): string | null {
  return formatSegmentMc(pv, computedType.value, direction, calendarContext.value)
}

const isTimePicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.TimePicker
})
const isTimeRangePicker = computed((): boolean => {
  return computedType.value === DatepickerTypes.TimePicker && props.range
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
  return !isTimePicker.value && !isDateTimePicker.value && !isPeriodsVisible.value
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
const isPeriodsVisible = computed((): boolean => {
  return (
    props.range &&
    (props.customPresets?.length || !!props.placeholders) &&
    !isTimePicker.value &&
    !isYearPicker.value &&
    !isMonthPicker.value
  )
})

const hasDisableDatesProp = computed((): boolean => {
  return typeof props.disabledDates === 'function'
})

const localValue = computed({
  get() {
    return getFormattedPickerDate(props.modelValue)
  },
  set(value) {
    const empty = value == null || (props.range && Array.isArray(value) && value.length === 0)
    if (empty) {
      fieldErrors.toggleErrorVisible()
      emit('update:modelValue', props.range ? [] : null)
      return
    }
    const date = getFormattedOutputDate(value)
    fieldErrors.toggleErrorVisible()
    emit('update:modelValue', date)
  }
})

const init = () => {
  props.setDefaultToday && handlePreselectToday()
}

const handlerPreselectRange = (period: string[]): void => {
  const [start, end] = period
  const ctx = calendarContext.value
  const d0 = parsePresetYmdToDate(start, ctx)
  const d1 = parsePresetYmdToDate(end, ctx)
  if (d0 && d1) input.value.updateInternalModelValue([d0, d1])
}

/**
 * Преселект при setDefaultToday = true
 * */
const handlePreselectToday = (): void => {
  if (isWeekPicker.value) return

  const hasValue = props.range
    ? !!(
        localValue.value?.length &&
        Array.isArray(localValue.value) &&
        localValue.value.every((v) => isValidDateish(v))
      )
    : isValidDateish(localValue.value)

  if (!hasValue) {
    let today: string | null = props.toIsoFormat
      ? new Date().toISOString()
      : formatNowAsOutput(computedType.value, calendarContext.value)
    if (!today) today = new Date().toISOString()
    localValue.value = props.range ? getFormattedPickerDate([today, today]) : getFormattedPickerDate(today)
  }
}

/**
 * Prepare dates for datepicker
 * */
const getFormattedPickerDate = (value: DatePickerValue): DatePickerValue => {
  if (isWeekPicker.value) {
    if (value == null || value === '') return props.range ? [] : null
    return value
  }
  const empty = value == null || value === '' || (props.range && Array.isArray(value) && value.length === 0)
  if (empty) return props.range ? [] : null

  let preparedValue = (props.range ? (Array.isArray(value) ? value : []) : [value]) as (string | null)[]
  if (!props.toIsoFormat) {
    const useSafeCalendarParse =
      computedType.value === DatepickerTypes.DatePicker || computedType.value === DatepickerTypes.DateTimePicker
    preparedValue = preparedValue.map((pv) => {
      if (useSafeCalendarParse) {
        return formatSegmentForPicker(pv, 'inbound')
      }
      return outputToPicker(String(pv).trim(), computedType.value, calendarContext.value)
    })
  }

  const [start, end] = preparedValue
  const startInvalid = start == null || (typeof start === 'string' && start === 'Invalid Date')
  const endInvalid = end == null || (typeof end === 'string' && end === 'Invalid Date')
  if (!props.range) return startInvalid ? null : start
  if (startInvalid || endInvalid) return []
  return [start, end].filter(Boolean) as DatePickerValue
}

/**
 * Prepare dates for output
 * */
const getFormattedOutputDate = (value: unknown): DatePickerValue => {
  if (isWeekPicker.value) {
    if (value == null || value === '') return props.range ? [] : null
    return value as DatePickerValue
  }
  const useSafeCalendarParse =
    !props.toIsoFormat &&
    (computedType.value === DatepickerTypes.DatePicker || computedType.value === DatepickerTypes.DateTimePicker)

  let preparedValue: (string | null)[]
  if (useSafeCalendarParse) {
    preparedValue = props.range
      ? Array.isArray(value)
        ? value.map((pv) => formatSegmentForPicker(pv, 'outbound'))
        : []
      : [formatSegmentForPicker(value, 'outbound')]
  } else {
    preparedValue = props.range ? (Array.isArray(value) ? value.map((pv) => String(pv)) : []) : [String(value)]
    if (!props.toIsoFormat) {
      preparedValue = preparedValue.map((pv) =>
        pickerToOutput(pv == null ? '' : String(pv), computedType.value, calendarContext.value)
      )
    }
  }

  const asNull = (pv: string | null): string | null =>
    pv === 'Invalid Date' || pv == null || pv === 'null' ? null : pv
  const [start, end] = preparedValue.map(asNull)
  const startInvalid = start == null || start === 'Invalid Date'
  const endInvalid = end == null || end === 'Invalid Date'
  if (!props.range) return startInvalid ? null : start
  if (startInvalid || endInvalid) return []
  return [start, end].filter(Boolean) as DatePickerValue
}

const selectPeriod = (key: string, isReturn = false) => {
  const end = coercePickDateToDate(pickDate.value)
  let start = new Date(end.getTime())
  switch (key) {
    case 'week':
      start = addCalendarDays(end, -7)
      break
    case 'month':
      start = addCalendarMonths(end, -1)
      break
    case 'quarter':
      start = addCalendarMonths(end, -3)
      break
    case 'year':
      start = addCalendarYears(end, -1)
      break
  }
  if (isReturn) return [start, end]
  input.value.updateInternalModelValue([start, end])
}
const handlePickDate = (date: DatePickerValue | Date) => {
  pickDate.value = date as DatePickerValue
}

const handleSubmit = () => {
  input.value.selectDate()
  input.value.closeMenu()
}

const disabledMonthsFilter = computed(() => {
  if (props.type !== DatepickerTypes.MonthPicker || typeof props.disabledDates !== 'function') return undefined
  const year = month_picker_view_year.value
  const disabled: number[] = []
  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1)
    if (props.disabledDates(date)) disabled.push(month)
  }
  return { months: disabled }
})

const onUpdateMonthYear = (e: any) => {
  const { year } = e
  month_picker_view_year.value = year
}

onMounted(init)

watch(
  () => props.errors,
  (value: string[]): void => {
    fieldErrors.setError(value)
  }
)
</script>

<template>
  <div ref="field" class="mc-date-picker" :class="classes" :style="pickerInlineStyles">
    <label v-if="$slots.title || !!props.title" :for="name" class="mc-date-picker__header">
      <!-- @slot Слот для заголовка над инпутом -->
      <slot name="title">
        <mc-title v-if="props.title" :weight="Weights.Medium">{{ props.title }}</mc-title>
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
          :format-locale="dateFnsFormatLocale"
          :markers="markers"
          :action-row="{}"
          :loading="loading"
          :week-numbers="weekNumbers"
          :placeholder="placeholder"
          :editable="editable"
          :disabled="disabled"
          :disabled-dates="disabledDates"
          :filters="disabledMonthsFilter"
          :allowed-dates="allowedDates"
          :min-date="minDate"
          :max-date="maxDate"
          :disabled-times="disabledTime"
          :teleport="props.teleport"
          :teleport-to="props.teleportTo"
          @range-start="handlePickDate"
          @update-month-year="onUpdateMonthYear"
        >
          <!-- @slot Слот для вставки в футер попапа календаря -->
          <template #action-row>
            <div v-if="isPeriodsVisible" class="mc-date-picker__footer-popup">
              <div class="mc-date-picker__footer-popup-periods">
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
                <template v-else-if="!hasDisableDatesProp">
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
                variation="purple-outline"
                :size="ButtonSize.Xs"
                class="mc-date-picker__confirm-button"
                @click="handleSubmit"
              >
                {{ placeholders.confirm || default_placeholders.confirm }}
              </mc-button>
            </div>
            <mc-button
              v-if="(isTimeRangePicker || isTimePicker || isDateTimePicker) && !isPeriodsVisible"
              variation="purple-outline"
              :size="ButtonSize.Xs"
              class="mc-date-picker__confirm-button"
              @click="handleSubmit"
            >
              {{ placeholders.confirm || default_placeholders.confirm }}
            </mc-button>
          </template>
          <template #input-icon>
            <mc-svg-icon
              v-if="!props.hideCalendarIcon"
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
    <div v-if="!!fieldErrors.errorText.value || !!props.helpText || !!$slots.bottom" class="mc-date-picker__footer">
      <mc-title
        v-if="!!fieldErrors.errorText.value"
        tag-name="div"
        color="red"
        :variation="TitleVariations.Overline"
        :html-data="fieldErrors.errorText.value"
      />
      <br v-if="!!fieldErrors.errorText.value && (!!props.helpText || !!$slots.bottom)" />
      <!-- @slot Слот для доп. текста под инпутом -->
      <slot name="bottom">
        <mc-title v-if="!!props.helpText" tag-name="div" :variation="TitleVariations.Overline">
          {{ props.helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
