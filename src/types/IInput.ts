import type { InputTypes } from '@/enums/Input'

export interface IInput {}

export type InputValue = string | number | null
export type InputTypesUnion = (typeof InputTypes)[keyof typeof InputTypes]
