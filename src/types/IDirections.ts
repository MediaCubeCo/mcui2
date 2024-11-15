import { Directions } from '@/enums/ui/Directions'

export interface IDirections {}

export type DirectionsUnion = (typeof Directions)[keyof typeof Directions]
