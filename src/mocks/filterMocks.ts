import { FilterRelations, FilterTypes } from '@/enums'
import type { IFilter, IFilterPlaceholders } from '@/types'

const value = {
  filter: {
    views_count: {
      more: 10
    },
    countries: {
      is: [1],
      is_not: [2]
    },
    email: 'crocodile@gena.com'
  },
  filter_name:
    'JTdCJTIyY291bnRyaWVzJTIyOiU3QiUyMmlzJTIyOiU3QiUyMjMlMjI6JTIyJUQwJUEzJUQwJUJBJUQxJTgwJUQwJUIwJUQwJUI4JUQwJUJEJUQwJUIwJTIyJTdEJTdELCUyMnZpZXdzX2NvdW50JTIyOiU3QiUyMm1vcmUlMjI6MTEsJTIybGVzcyUyMjoyMjIlN0QsJTIyY3JlYXRlZF9hdCUyMjolN0IlMjJtb3JlJTIyOiUyMjIwMjAtMTAtMDglMjIsJTIybGVzcyUyMjolMjIyMDIwLTExLTI3JTIyJTdEJTdE'
}
const filters: IFilter[] = [
  {
    type: FilterTypes.Text,
    name: 'Поиск',
    value: 'email'
  },
  {
    type: FilterTypes.Relation,
    is_text: false,
    name: 'Страна',
    value: 'countries',
    options: [
      { name: 'Беларусь', value: 1 },
      { name: 'Россия', value: 2 },
      { name: 'Украина', value: 3 }
    ]
  },
  {
    type: FilterTypes.Relation,
    name: 'Пользователь',
    value: 'users',
    getAjaxOne: (val: string) => {
      return fetch('https://reqres.in/api/users?q=' + val)
        .then((result) => {
          return result.json()
        })
        .then((result) => {
          return result.data.map((r: any) => ({
            name: r.first_name + ' ' + r.last_name,
            value: r.id
          }))
        })
    },
    getAjaxOptions: (val: string) => {
      return fetch('https://reqres.in/api/users/' + val)
        .then((result) => {
          return result.json()
        })
        .then((result) => {
          const r = result.data
          return {
            name: r.first_name + ' ' + r.last_name,
            value: r.id
          }
        })
    }
  },
  {
    type: FilterTypes.Range,
    name: 'Просмотры',
    value: 'views_count',
    min: 0,
    max: 10000
  },
  {
    type: FilterTypes.Date,
    name: 'Дата создания',
    value: 'created_at'
  },
  {
    type: FilterTypes.Relation,
    name: 'Тэг',
    value: 'tags',
    is_text: true
  },
  {
    type: FilterTypes.Fast,
    relation: FilterRelations.Exists,
    default: 1,
    value: 'disconnected_mcn_score',
    name: 'Отключенные по MCN Score',
    description: 'Отключенные по MCN Score tooltip'
  }
]

const defaultPlaceholders: IFilterPlaceholders = {
  main_tooltip: 'Click to open/close',
  value: 'Value',
  condition: 'Condition',
  create_preset: 'Create new preset',
  fast_filters: 'Fast filters',
  added_filters: 'Added filters',
  enter_preset_name: 'Enter preset name',
  enter_preset_tooltip: 'Сохранение выбранных параметров фильтра в пользовательский пресет',
  from: 'From',
  to: 'To',
  enter: 'Enter',
  choose: 'Choose',
  actions: {
    add: 'Add',
    save: 'Save',
    clear: 'Clear',
    create: 'Create',
    delete_preset: 'Delete preset',
    is: 'This',
    is_not: 'Is not',
    empty: 'Empty',
    confirm: 'Confirm'
  },
  calendar: {
    week: 'Week',
    month: 'Month',
    quarter: 'Quarter',
    year: 'Year',
    confirm: 'Confirm'
  },
  messages: {
    same_filter: 'Уже есть фильтр с таким параметром',
    same_preset_name: 'Уже есть фильтр с таким именем',
    accidentally_cleared: 'Случайно очистили?',
    accidentally_deleted: 'Случайно удалили?',
    more_than: 'Значение "от" не может быть больше значения "до"'
  }
}

export { value, filters, defaultPlaceholders }
