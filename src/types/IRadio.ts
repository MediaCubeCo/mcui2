import { RadioVariation } from '@/enums/Radio'

export interface IRadio {}

export type RadioVariationUnion = (typeof RadioVariation)[keyof typeof RadioVariation]
