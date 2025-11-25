import {
  DatepickerFormat,
  DatepickerFormatsVariations,
  DatepickerOutputFormat,
  DatepickerTypes,
  DayjsFormat
} from '@/enums/Datepicker'

export interface IDatepickerPlaceholders {
  week?: string
  month?: string
  quarter?: string
  year?: string
  confirm?: string
}

export interface IDatepickerPreset {
  title: string
  period: string[] // Date in YYYY-MM-DD
}

export type DatePickerValue = null | string | string[]

export type DatepickerFormatsObjectFormat = {
  [DatepickerFormatsVariations.Picker]: DatepickerFormat
  [DatepickerFormatsVariations.Dayjs]: DayjsFormat
  [DatepickerFormatsVariations.Output]: DatepickerOutputFormat
}
export type DatepickerFormatsObject = {
  [key in DatepickerTypes]: DatepickerFormatsObjectFormat
}

export type DatepickerTypesUnion = (typeof DatepickerTypes)[keyof typeof DatepickerTypes]
export type DatepickerFormatsVariationsUnion =
  (typeof DatepickerFormatsVariations)[keyof typeof DatepickerFormatsVariations]
export type DatepickerFormatUnion = (typeof DatepickerFormat)[keyof typeof DatepickerFormat]
export type DayjsFormatUnion = (typeof DayjsFormat)[keyof typeof DayjsFormat]
export type DatepickerOutputFormatUnion =
  (typeof DatepickerOutputFormat)[keyof typeof DatepickerOutputFormat]
