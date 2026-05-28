import { FilterRelations, FilterTypes } from '@/enums/Filter'
import type { IFilter } from '@/types/IFilter'
import { UiFilterTranslations } from '@/types/ITranslations'

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
    name: 'Поиск emails relation text',
    value: 'emails',
    is_text: true,
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

const defaultPlaceholders = UiFilterTranslations

export { value, filters, defaultPlaceholders }
