import type { PreviewSizes } from '@/enums/Preview'

export interface IPreview {}

export type PreviewSizesUnion = (typeof PreviewSizes)[keyof typeof PreviewSizes]
