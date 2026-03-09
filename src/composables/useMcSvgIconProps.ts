import { computed, type ComputedRef } from 'vue'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import type { ColorTypes } from '@/types/styles/Colors'
import type { DirectionsUnion } from '@/types/IDirections'
import { Directions } from '@/enums/ui/Directions'
import {
  adaptiveAdditionalProps,
  adaptivePropsParams,
  adaptivePropsSizes
} from '@/utils/mcSvgIconAdaptiveProps'
import { useTheme } from '@/composables/useTheme'

/**
 * Пропсы для самостоятельного использования иконок (size, color, weight, dir + адаптивные).
 * Используется в сгенерированных компонентах иконок и совпадает с контрактом McSvgIcon (без name/spriteId/defaultName).
 */
export const mcSvgIconStandaloneProps = {
  color: {
    type: String as () => ColorTypes,
    default: ''
  },
  size: {
    type: String as () => SizeTypes,
    default: '250'
  },
  weight: {
    type: Number,
    default: 1.5
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  },
  ...adaptiveAdditionalProps
} as const

export type McSvgIconStandaloneProps = {
  color?: ColorTypes
  size?: SizeTypes
  weight?: number
  dir?: DirectionsUnion
} & Record<string, unknown>

/**
 * Общая логика классов и стилей для иконки (как в McSvgIcon).
 * Используется сгенерированными иконками в режиме «самостоятельная» и при желании может использоваться McSvgIcon.
 */
export function useMcSvgIconProps(props: McSvgIconStandaloneProps): {
  classes: ComputedRef<Record<string, boolean>>
  styles: ComputedRef<Record<string, string>>
} {
  const theme = useTheme()

  const responsivePropsClasses = computed(() => {
    const result: Record<string, boolean> = {}
    adaptivePropsParams.forEach((value) => {
      adaptivePropsSizes.forEach((size) => {
        const sizeKey = `${value}-${size}`
        const sizeValue = (props as Record<string, unknown>)[sizeKey]
        result[`mc-svg-icon--${value}-${size}-${sizeValue}`] = !!sizeValue
      })
    })
    return result
  })

  const classes = computed(() => ({
    'mc-svg-icon': true,
    [`mc-svg-icon--dir-${props.dir}`]: !!props.dir,
    ...responsivePropsClasses.value
  }))

  const styles = computed(() => ({
    '--mc-svg-icon-size': Sizes[props.size ?? '250'],
    '--mc-svg-icon-weight': String(props.weight ?? 1.5)
      ?.replace('.', '')
      ?.split('')
      ?.join('.'),
    ...(props.color ? { '--mc-svg-icon-color': theme.colors[props.color] } : {})
  }))

  return { classes, styles }
}
