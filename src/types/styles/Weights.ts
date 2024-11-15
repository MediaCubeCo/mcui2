import { Weights } from '@/enums/ui/Weights'

export type WeightsUnion = (typeof Weights)[keyof typeof Weights]
