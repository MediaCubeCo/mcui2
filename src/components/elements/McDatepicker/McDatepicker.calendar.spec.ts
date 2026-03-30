import { describe, expect, it } from 'vitest'
import { DatepickerTypes } from '@/enums/Datepicker'
import {
  getDefaultTimeZone,
  outputToPicker,
  pickerToOutput,
  parsePresetYmdToDate,
  wallDateTimeToUtcDate
} from './McDatepicker.calendar'

const ctxLocal = { locale: 'en', timeZone: 'UTC', useTimezone: false }
const ctxRu = { locale: 'ru', timeZone: 'UTC', useTimezone: false }
const ctxMoscow = { locale: 'en', timeZone: 'Europe/Moscow', useTimezone: true }

describe('McDatepicker.calendar', () => {
  it('getDefaultTimeZone returns string', () => {
    expect(typeof getDefaultTimeZone()).toBe('string')
    expect(getDefaultTimeZone().length).toBeGreaterThan(0)
  })

  it('DatePicker output <-> picker (local)', () => {
    const out = '2026-03-05'
    const pick = outputToPicker(out, DatepickerTypes.DatePicker, ctxLocal)
    expect(pick).toBe('05.03.2026')
    expect(pickerToOutput(pick!, DatepickerTypes.DatePicker, ctxLocal)).toBe(out)
  })

  it('DateTimePicker round-trip (local)', () => {
    const out = '2026-03-05 14:30'
    const pick = outputToPicker(out, DatepickerTypes.DateTimePicker, ctxLocal)
    expect(pick).toBe('05.03.2026 14:30')
    expect(pickerToOutput(pick!, DatepickerTypes.DateTimePicker, ctxLocal)).toBe(out)
  })

  it('WeekPicker output <-> picker', () => {
    const out = '2026-10'
    const pick = outputToPicker(out, DatepickerTypes.WeekPicker, ctxLocal)
    expect(pick).toMatch(/^\d{1,2}\.2026$/)
    expect(pickerToOutput(pick!, DatepickerTypes.WeekPicker, ctxLocal)).toBe(out)
  })

  it('MonthPicker output YYYY-MM-DD <-> picker (en)', () => {
    const out = '2026-03-01'
    const pick = outputToPicker(out, DatepickerTypes.MonthPicker, ctxLocal)
    expect(pick).not.toBeNull()
    expect(pickerToOutput(pick!, DatepickerTypes.MonthPicker, ctxLocal)).toBe('2026-03-01')
  })

  it('MonthPicker output dd.MM.yyyy <-> picker (ru)', () => {
    const dmy = '01.03.2026'
    const pick = outputToPicker(dmy, DatepickerTypes.MonthPicker, ctxRu)
    expect(pick).not.toBeNull()
    expect(pickerToOutput(pick!, DatepickerTypes.MonthPicker, ctxRu)).toBe('2026-03-01')
  })

  it('parsePresetYmdToDate', () => {
    const d = parsePresetYmdToDate('2026-01-15', ctxLocal)
    expect(d).not.toBeNull()
    expect(d!.getFullYear()).toBe(2026)
    expect(d!.getMonth()).toBe(0)
    expect(d!.getDate()).toBe(15)
  })

  it('wallDateTimeToUtcDate Moscow midnight', () => {
    const d = wallDateTimeToUtcDate(2026, 3, 5, 0, 0, 0, 'Europe/Moscow')
    expect(d).not.toBeNull()
    const utcH = d!.getUTCHours()
    expect(utcH).toBe(21)
    expect(d!.getUTCDate()).toBe(4)
  })
})
