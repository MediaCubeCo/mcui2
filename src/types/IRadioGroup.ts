import { RadioGroupDirection } from '@/enums/RadioGroup'

export interface IRadioGroupOption {
  label: string | number
  value: string | number
  helpText?: string
  disabled?: boolean
}

export type IRadioGroupOptions = string[] | number[] | IRadioGroupOption[]
export type RadioGroupDirectionUnion =
  (typeof RadioGroupDirection)[keyof typeof RadioGroupDirection]
