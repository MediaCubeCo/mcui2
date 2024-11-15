import { TitleSizes, TitleVariations } from '@/enums/Title'

export interface ITitle {}

export type TitleSizesUnion = (typeof TitleSizes)[keyof typeof TitleSizes]
export type TitleVariationsUnion = (typeof TitleVariations)[keyof typeof TitleVariations]
