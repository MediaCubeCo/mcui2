import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/en'


// EN have direct import
const dayjsLocales = {
    en: () => Promise.resolve(),
    es: () => import('dayjs/locale/es'),
    pt: () => import('dayjs/locale/pt'),
    th: () => import('dayjs/locale/th'),
    ru: () => import('dayjs/locale/ru'),
    vi: () => import('dayjs/locale/vi'),
}

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

export { dayjs, dayjsLocales }
