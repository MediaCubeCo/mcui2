/**
 * Календарная логика McDatepicker: Date + Intl (стена даты/времени в IANA-зоне), date-fns для month-picker.
 * Семантика: Output — контракт API; Picker — маски vue-datepicker (те же токены date-fns).
 */

import { format, isValid, parse } from 'date-fns'
import type { Locale } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { ru } from 'date-fns/locale/ru'
import { DatepickerFormat, DatepickerTypes } from '@/enums/Datepicker'
import type { DatePickerValue } from '@/types/IDatepicker'

export type McFormatPair = {
  picker: string
  output: string
}

export type McCalendarContext = {
  locale: string
  timeZone: string
  useTimezone: boolean
}

/** Локаль date-fns для `lang` (vue-datepicker `format-locale`). */
export function langToDateFnsLocale(lang: string): Locale {
  const key = lang.toLowerCase().split('-')[0]
  if (key === 'ru') return ru
  return enUS
}

const MONTH_PICKER_PATTERN = DatepickerFormat.MonthPicker

const ISO_DATE_OR_DATETIME_PREFIX_RE = /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/

export function getDefaultTimeZone(): string {
  try {
    if (typeof Intl === 'undefined' || !Intl.DateTimeFormat) return 'UTC'
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return tz && typeof tz === 'string' ? tz : 'UTC'
  } catch {
    return 'UTC'
  }
}

/** Части календаря/времени в локали или в зоне (если передан timeZone). */
export function getCalendarParts(
  d: Date,
  timeZone: string | undefined
): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  if (Number.isNaN(d.getTime())) {
    return { year: NaN, month: NaN, day: NaN, hour: NaN, minute: NaN, second: NaN }
  }
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  if (timeZone) opts.timeZone = timeZone
  const fmt = new Intl.DateTimeFormat('en-CA', opts)
  const parts = fmt.formatToParts(d)
  const m: Record<string, string> = {}
  for (const p of parts) {
    if (p.type !== 'literal') m[p.type] = p.value
  }
  return {
    year: Number(m.year),
    month: Number(m.month),
    day: Number(m.day),
    hour: Number(m.hour ?? 0),
    minute: Number(m.minute ?? 0),
    second: Number(m.second ?? 0)
  }
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function pad4(n: number): string {
  return n < 1000 ? `000${n}`.slice(-4) : String(n)
}

/** Wall time в зоне → UTC Date (линейный перебор минут в окне ±54 ч — устойчиво к DST). */
export function wallDateTimeToUtcDate(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  s: number,
  timeZone: string
): Date | null {
  if (!Number.isFinite(y) || mo < 1 || mo > 12 || d < 1 || d > 31) return null
  const anchor = Date.UTC(y, mo - 1, d, h, mi, s)
  const windowMs = 54 * 3600000
  for (let t = anchor - windowMs; t <= anchor + windowMs; t += 60000) {
    const p = getCalendarParts(new Date(t), timeZone)
    if (
      p.year === y &&
      p.month === mo &&
      p.day === d &&
      p.hour === h &&
      p.minute === mi &&
      p.second === s
    ) {
      return new Date(t)
    }
  }
  return null
}

/** Локальная стена → Date */
export function localWallToDate(y: number, mo: number, d: number, h: number, mi: number, s: number): Date | null {
  if (!Number.isFinite(y) || mo < 1 || mo > 12 || d < 1 || d > 31) return null
  const dt = new Date(y, mo - 1, d, h, mi, s)
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== mo - 1 ||
    dt.getDate() !== d ||
    dt.getHours() !== h ||
    dt.getMinutes() !== mi ||
    dt.getSeconds() !== s
  ) {
    return null
  }
  return dt
}

function instantForWall(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  s: number,
  ctx: McCalendarContext
): Date | null {
  if (ctx.useTimezone) return wallDateTimeToUtcDate(y, mo, d, h, mi, s, ctx.timeZone)
  return localWallToDate(y, mo, d, h, mi, s)
}

function formatOutputDateOnly(y: number, mo: number, d: number): string {
  return `${pad4(y)}-${pad2(mo)}-${pad2(d)}`
}

function formatPickerDateOnly(y: number, mo: number, d: number): string {
  return `${pad2(d)}.${pad2(mo)}.${pad4(y)}`
}

function formatOutputDateTime(y: number, mo: number, d: number, h: number, mi: number): string {
  return `${formatOutputDateOnly(y, mo, d)} ${pad2(h)}:${pad2(mi)}`
}

function formatPickerDateTime(y: number, mo: number, d: number, h: number, mi: number): string {
  return `${formatPickerDateOnly(y, mo, d)} ${pad2(h)}:${pad2(mi)}`
}

const RE_YMD = /^(\d{4})-(\d{2})-(\d{2})$/
const RE_DMY = /^(\d{2})\.(\d{2})\.(\d{4})$/
const RE_YMD_HM = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/
const RE_DMY_HM = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/
const RE_HM = /^(\d{2}):(\d{2})$/
const RE_YEAR = /^(\d{4})$/
const RE_ISO_WEEK = /^(\d{4})-(\d{1,2})$/
const RE_WW_YYYY = /^(\d{1,2})\.(\d{4})$/

/** ISO week: Monday of week `week` in ISO year `isoY` (UTC math; неделя как у типичных ISO реализаций). */
export function isoWeekMonday(isoY: number, week: number): Date {
  const jan4 = new Date(Date.UTC(isoY, 0, 4))
  const dow = jan4.getUTCDay() || 7
  const mondayW1 = new Date(jan4.getTime() - (dow - 1) * 86400000)
  return new Date(mondayW1.getTime() + (week - 1) * 7 * 86400000)
}

export function getISOWeekYearAndNumber(d: Date): { isoY: number; week: number } {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7))
  const isoY = t.getUTCFullYear()
  const yearStart = new Date(Date.UTC(isoY, 0, 1))
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return { isoY, week }
}

function formatWeekOutput(d: Date): string {
  const { isoY, week } = getISOWeekYearAndNumber(d)
  return `${pad4(isoY)}-${pad2(week)}`
}

function parseWeekOutput(s: string): { isoY: number; week: number } | null {
  const m = RE_ISO_WEEK.exec(s.trim())
  if (!m) return null
  const isoY = Number(m[1])
  const week = Number(m[2])
  if (week < 1 || week > 53) return null
  return { isoY, week }
}

function parseMonthPicker(str: string, localeCode: string): { y: number; m: number } | null {
  const locale = langToDateFnsLocale(localeCode)
  const ref = new Date(2000, 0, 1)
  const d = parse(str.trim(), MONTH_PICKER_PATTERN, ref, { locale })
  if (!isValid(d)) return null
  return { y: d.getFullYear(), m: d.getMonth() + 1 }
}

function formatMonthPicker(y: number, month1: number, localeCode: string): string {
  const locale = langToDateFnsLocale(localeCode)
  const d = new Date(y, month1 - 1, 1)
  return format(d, MONTH_PICKER_PATTERN, { locale })
}

function dateToPartsForFlow(d: Date, ctx: McCalendarContext) {
  return getCalendarParts(d, ctx.useTimezone ? ctx.timeZone : undefined)
}

/** Output (контракт) → Picker-строка */
export function outputToPicker(str: string, kind: DatepickerTypes, ctx: McCalendarContext): string | null {
  const s = str.trim()
  switch (kind) {
    case DatepickerTypes.DatePicker: {
      const m = RE_YMD.exec(s)
      if (!m) return null
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      if (!instantForWall(y, mo, d, 0, 0, 0, ctx)) return null
      return formatPickerDateOnly(y, mo, d)
    }
    case DatepickerTypes.DateTimePicker: {
      const m = RE_YMD_HM.exec(s)
      if (!m) return null
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      const h = Number(m[4])
      const mi = Number(m[5])
      if (!instantForWall(y, mo, d, h, mi, 0, ctx)) return null
      return formatPickerDateTime(y, mo, d, h, mi)
    }
    case DatepickerTypes.TimePicker: {
      const m = RE_HM.exec(s)
      if (!m) return null
      return `${pad2(Number(m[1]))}:${pad2(Number(m[2]))}`
    }
    case DatepickerTypes.MonthPicker: {
      let y: number
      let mo: number
      let day = 1
      const mYmd = RE_YMD.exec(s)
      if (mYmd) {
        y = Number(mYmd[1])
        mo = Number(mYmd[2])
        day = Number(mYmd[3])
      } else {
        const mDmy = RE_DMY.exec(s)
        if (!mDmy) return null
        day = Number(mDmy[1])
        mo = Number(mDmy[2])
        y = Number(mDmy[3])
      }
      if (mo < 1 || mo > 12 || day < 1 || day > 31) return null
      if (!instantForWall(y, mo, day, 0, 0, 0, ctx)) return null
      return formatMonthPicker(y, mo, ctx.locale)
    }
    case DatepickerTypes.YearPicker: {
      const m = RE_YEAR.exec(s)
      if (!m) return null
      return m[1]
    }
    case DatepickerTypes.WeekPicker: {
      const w = parseWeekOutput(s)
      if (!w) return null
      return `${pad2(w.week)}.${pad4(w.isoY)}`
    }
    default:
      return null
  }
}

/** Picker-строка / ISO / EU → Output */
export function pickerToOutput(str: string, kind: DatepickerTypes, ctx: McCalendarContext): string | null {
  const raw = str.trim()
  if (kind === DatepickerTypes.WeekPicker) {
    const m = RE_WW_YYYY.exec(raw)
    if (!m) return null
    const week = Number(m[1])
    const isoY = Number(m[2])
    if (week < 1 || week > 53) return null
    return `${pad4(isoY)}-${pad2(week)}`
  }
  if (kind === DatepickerTypes.YearPicker) {
    const m = RE_YEAR.exec(raw)
    if (!m) return null
    return m[1]
  }
  if (kind === DatepickerTypes.MonthPicker) {
    const parsed = parseMonthPicker(raw, ctx.locale)
    if (!parsed) return null
    return formatOutputDateOnly(parsed.y, parsed.m, 1)
  }
  if (kind === DatepickerTypes.TimePicker) {
    const m = RE_HM.exec(raw)
    if (!m) return null
    return `${pad2(Number(m[1]))}:${pad2(Number(m[2]))}`
  }
  if (kind === DatepickerTypes.DateTimePicker) {
    let m = RE_DMY_HM.exec(raw)
    if (m) {
      const d = Number(m[1])
      const mo = Number(m[2])
      const y = Number(m[3])
      const h = Number(m[4])
      const mi = Number(m[5])
      if (!instantForWall(y, mo, d, h, mi, 0, ctx)) return null
      return formatOutputDateTime(y, mo, d, h, mi)
    }
    if (ISO_DATE_OR_DATETIME_PREFIX_RE.test(raw)) {
      const d = new Date(raw)
      if (Number.isNaN(d.getTime())) return null
      const p = dateToPartsForFlow(d, ctx)
      return formatOutputDateTime(p.year, p.month, p.day, p.hour, p.minute)
    }
    m = RE_YMD_HM.exec(raw)
    if (m) {
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      const h = Number(m[4])
      const mi = Number(m[5])
      if (!instantForWall(y, mo, d, h, mi, 0, ctx)) return null
      return formatOutputDateTime(y, mo, d, h, mi)
    }
    return null
  }
  if (kind === DatepickerTypes.DatePicker) {
    let m = RE_DMY.exec(raw)
    if (m) {
      const d = Number(m[1])
      const mo = Number(m[2])
      const y = Number(m[3])
      if (!instantForWall(y, mo, d, 0, 0, 0, ctx)) return null
      return formatOutputDateOnly(y, mo, d)
    }
    m = RE_YMD.exec(raw)
    if (m) {
      const y = Number(m[1])
      const mo = Number(m[2])
      const d = Number(m[3])
      if (!instantForWall(y, mo, d, 0, 0, 0, ctx)) return null
      return formatOutputDateOnly(y, mo, d)
    }
    if (ISO_DATE_OR_DATETIME_PREFIX_RE.test(raw)) {
      const d = new Date(raw)
      if (Number.isNaN(d.getTime())) return null
      const p = dateToPartsForFlow(d, ctx)
      return formatOutputDateOnly(p.year, p.month, p.day)
    }
    return null
  }
  return null
}

/** Date → Output по типу */
export function dateToOutput(d: Date, kind: DatepickerTypes, ctx: McCalendarContext): string | null {
  if (Number.isNaN(d.getTime())) return null
  const p = dateToPartsForFlow(d, ctx)
  switch (kind) {
    case DatepickerTypes.DatePicker:
      return formatOutputDateOnly(p.year, p.month, p.day)
    case DatepickerTypes.DateTimePicker:
      return formatOutputDateTime(p.year, p.month, p.day, p.hour, p.minute)
    case DatepickerTypes.TimePicker:
      return `${pad2(p.hour)}:${pad2(p.minute)}`
    case DatepickerTypes.MonthPicker:
      return formatOutputDateOnly(p.year, p.month, 1)
    case DatepickerTypes.YearPicker:
      return pad4(p.year)
    case DatepickerTypes.WeekPicker:
      return formatWeekOutput(d)
    default:
      return null
  }
}

/** Date → Picker по типу */
export function dateToPicker(d: Date, kind: DatepickerTypes, ctx: McCalendarContext): string | null {
  if (Number.isNaN(d.getTime())) return null
  const p = dateToPartsForFlow(d, ctx)
  switch (kind) {
    case DatepickerTypes.DatePicker:
      return formatPickerDateOnly(p.year, p.month, p.day)
    case DatepickerTypes.DateTimePicker:
      return formatPickerDateTime(p.year, p.month, p.day, p.hour, p.minute)
    case DatepickerTypes.TimePicker:
      return `${pad2(p.hour)}:${pad2(p.minute)}`
    case DatepickerTypes.MonthPicker:
      return formatMonthPicker(p.year, p.month, ctx.locale)
    case DatepickerTypes.YearPicker:
      return pad4(p.year)
    case DatepickerTypes.WeekPicker: {
      const { isoY, week } = getISOWeekYearAndNumber(d)
      return `${pad2(week)}.${pad4(isoY)}`
    }
    default:
      return null
  }
}

/**
 * Inbound: modelValue (Output) → строка для vue-datepicker (Picker).
 * Outbound: значение от пикера (Picker / Date / ISO) → Output.
 */
export function formatSegmentMc(
  pv: unknown,
  kind: DatepickerTypes,
  direction: 'inbound' | 'outbound',
  ctx: McCalendarContext
): string | null {
  if (pv == null || pv === '') return null
  if (pv instanceof Date) {
    if (Number.isNaN(pv.getTime())) return null
    return direction === 'inbound' ? dateToPicker(pv, kind, ctx) : dateToOutput(pv, kind, ctx)
  }
  const str = String(pv)
  if (direction === 'inbound') return outputToPicker(str, kind, ctx)
  return pickerToOutput(str, kind, ctx)
}

/** Парс YYYY-MM-DD пресета → Date для updateInternalModelValue (полночь локально или в зоне). */
export function parsePresetYmdToDate(ymd: string, ctx: McCalendarContext): Date | null {
  const m = RE_YMD.exec(ymd.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  return instantForWall(y, mo, d, 0, 0, 0, ctx)
}

export function isValidDateish(v: unknown): boolean {
  if (v == null || v === '') return false
  if (v instanceof Date) return !Number.isNaN(v.getTime())
  if (typeof v === 'string') {
    if (v === 'Invalid Date') return false
    const d = new Date(v)
    return !Number.isNaN(d.getTime())
  }
  return false
}

export function addCalendarDays(d: Date, days: number): Date {
  const x = new Date(d.getTime())
  x.setDate(x.getDate() + days)
  return x
}

export function addCalendarMonths(d: Date, months: number): Date {
  const x = new Date(d.getTime())
  const day = x.getDate()
  x.setMonth(x.getMonth() + months)
  if (x.getDate() < day) x.setDate(0)
  return x
}

export function addCalendarYears(d: Date, years: number): Date {
  const x = new Date(d.getTime())
  x.setFullYear(x.getFullYear() + years)
  return x
}

/** «Сегодня» в Output для типа (TimePicker — текущее локальное/зонное время). */
export function formatNowAsOutput(kind: DatepickerTypes, ctx: McCalendarContext): string | null {
  return dateToOutput(new Date(), kind, ctx)
}

/** pickDate (range-start) → Date */
export function coercePickDateToDate(v: DatePickerValue | Date | null | undefined): Date {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v
  if (typeof v === 'string' && v.trim()) {
    const d = new Date(v)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}
