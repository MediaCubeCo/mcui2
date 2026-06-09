import { IDatepickerPlaceholders } from '@/types/IDatepicker'
import { ISelectDefaultTranslate } from '@/types/ISelect'
import { IFilterPlaceholders } from '@/types/IFilter'


export interface ITranslations {
  select?: ISelectDefaultTranslate
  datePicker?: Partial<IDatepickerPlaceholders>
  filter?: Partial<IFilterPlaceholders>
}

export const UiSelectTranslations: ISelectDefaultTranslate = {
  noResultsText: 'No results',
  emptyList: 'List is empty'
}

export const UiDatePickerTranslations: IDatepickerPlaceholders = {
  week: 'Week',
  month: 'Month',
  quarter: 'Quarter',
  year: 'Year',
  confirm: 'Confirm'
}

export const UiFilterTranslations: IFilterPlaceholders = {
  main_tooltip: 'Click to open/close',
  value: 'Value',
  condition: 'Condition',
  create_preset: 'Create new preset',
  fast_filters: 'Fast filters',
  added_filters: 'Added filters',
  enter_preset_name: 'Enter preset name',
  enter_preset_tooltip: 'Save selected filter parameters to a custom preset',
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
    same_filter: 'A filter with this parameter already exists',
    same_preset_name: 'A preset with this name already exists',
    accidentally_cleared: 'Accidentally cleared?',
    accidentally_deleted: 'Accidentally deleted?',
    more_than: 'The "From" value cannot be greater than the "To" value'
  }
}

export const UiComponentTranslations: ITranslations = {
  select: UiSelectTranslations,
  datePicker: UiDatePickerTranslations,
  filter: UiFilterTranslations
}