import { default as dayjs } from 'dayjs/esm'
import { default as timezone } from 'dayjs/esm/plugin/timezone'
import { default as utc } from 'dayjs/esm/plugin/utc'
import { default as customParseFormat } from 'dayjs/esm/plugin/customParseFormat'
import * as en from 'dayjs/esm/locale/en'
import * as es from 'dayjs/esm/locale/es'
import * as pt from 'dayjs/esm/locale/pt'
import * as th from 'dayjs/esm/locale/th'
import * as ru from 'dayjs/esm/locale/ru'
import * as vi from 'dayjs/esm/locale/vi'

const dayjsLocales = {
  en,
  es,
  pt,
  th,
  ru,
  vi
}

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

export { dayjs, dayjsLocales }
