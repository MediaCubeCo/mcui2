<script setup lang="ts">
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { type ColorTypes } from '@/types/styles/Colors'
import { computed, type PropType, useId, provide } from 'vue'
import type { DirectionsUnion } from '@/types/IDirections'
import { type IconsListUnion } from '@/types/styles/Icons'
import { Directions } from '@/enums/ui/Directions'
import { adaptiveAdditionalProps, adaptivePropsParams, adaptivePropsSizes } from '@/utils/mcSvgIconAdaptiveProps'
import { useHelper } from '@/composables/useHelper'
import { useTheme } from '@/composables/useTheme'
import { iconRegistry } from '@/components/icons/registry'

const DEFAULT_SPRITE_ID = 'mcSvgIconSprite'
/** Ключ provide/inject для id символа при использовании иконки внутри McSvgIcon */
const helper = useHelper()
const props = defineProps({
  ...adaptiveAdditionalProps,
  /**
   * Имя иконки
   */
  name: {
    type: String as () => IconsListUnion,
    required: true
  },
  /**
   * ID-префикс в названиях иконок, для использлования иконок из стороннего спрайта
   */
  spriteId: {
    type: String as PropType<string>,
    default: 'mcSvgIconSprite'
  },
  /**
   * Цвет иконки
   * (по токенам)
   */
  color: {
    type: String as () => ColorTypes,
    default: ''
  },
  /**
   * Размер
   */
  size: {
    type: String as () => SizeTypes,
    default: '250'
  },
  /**
   * Толщина линий 0-5 если нужно больше, нужно дописать список в стилях
   * stroke-width
   */
  weight: {
    type: Number as PropType<number>,
    default: 1.5
  },
  /**
   * Отображение иконки,
   * если не найдена по имени
   * в 'name'
   */
  defaultName: {
    type: String as PropType<string>,
    default: ''
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  }
})
const theme = useTheme()

const responsivePropsClasses = computed((): { [key: string]: boolean } => {
  const result: { [key: string]: any } = {}
  adaptivePropsParams.forEach((value) => {
    adaptivePropsSizes.forEach((size) => {
      //@ts-ignore
      const sizeValue: string | undefined | unknown = props[`${value}${helper.upperFirst(size)}`]
      result[`mc-svg-icon--${value}-${size}-${sizeValue}`] = !!sizeValue
    })
  })

  return result
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-svg-icon': true,
  [`mc-svg-icon--dir-${props.dir}`]: !!props.dir,
  ...responsivePropsClasses.value
}))

const styles = computed((): { [key: string]: string } => ({
  ['--mc-svg-icon-size']: Sizes[props.size],
  ['--mc-svg-icon-weight']: String(props.weight)?.replace('.', '')?.split('')?.join('.'),
  ['--mc-svg-icon-color']: props.color && theme.colors[props.color]
}))

const useIconRegistry = computed(() => props.spriteId === DEFAULT_SPRITE_ID)

const iconComponent = computed(() => {
  if (!useIconRegistry.value) return null
  return (
    iconRegistry[props.name as IconsListUnion] ??
    (props.defaultName ? iconRegistry[props.defaultName as IconsListUnion] : null)
  )
})

const symbolId = useId() + props.name
provide('mcSvgIconSymbolId', symbolId)
</script>

<template>
  <svg :class="classes" :style="styles">
    <template v-if="iconComponent">
      <component :is="iconComponent" />
      <use :href="`#${symbolId}`" />
    </template>
    <use v-else :xlink:href="`#${props.spriteId}-${props.name}`" />
  </svg>
</template>

<style lang="scss" src="./index.scss"></style>
