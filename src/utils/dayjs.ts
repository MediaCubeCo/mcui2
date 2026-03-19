import dayjs from 'dayjs/esm'
import timezone from 'dayjs/esm/plugin/timezone'
import utc from 'dayjs/esm/plugin/utc'
import customParseFormat from 'dayjs/esm/plugin/customParseFormat'

const imported = new Set()

const locales = {
  'en': import(`dayjs/esm/locale/en`),
  'es': import(`dayjs/esm/locale/es`),
  'pt': import(`dayjs/esm/locale/pt`),
  'th': import(`dayjs/esm/locale/th`),
  'ru': import(`dayjs/esm/locale/ru`),
  'vi': import(`dayjs/esm/locale/vi`),
}
const dayjsLocales = Object.keys(locales)

async function setDayjsLocale (locale: any) {
  // @ts-ignore
  if (!locales[locale]) return
  if (!imported.has(locale)) {
    // @ts-ignore
    await locales[locale]
    imported.add(locale)
  }
  dayjs.locale(locale)
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export { dayjs, dayjsLocales, setDayjsLocale }
