import { HorizontalAlignment } from '@/enums/ui/Alignment'

export type HorizontalAlignmentUnion =
  (typeof HorizontalAlignment)[keyof typeof HorizontalAlignment]
