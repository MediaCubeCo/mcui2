<script setup lang="ts">
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { type ColorTypes } from '@/types/styles/Colors'
import { computed, type PropType } from 'vue'
import type { DirectionsUnion } from '@/types/IDirections'
import { type IconsListUnion } from '@/types/styles/Icons'
import { Directions } from '@/enums/ui/Directions'
import { adaptiveAdditionalProps, adaptivePropsParams, adaptivePropsSizes } from '@/utils/mcSvgIconAdaptiveProps'
import { useHelper } from '@/composables/useHelper'
import { useTheme } from '@/composables/useTheme'
//@ts-ignore
import { SPRITE_IDS } from '@/consts/iconsSpriteIds.js'

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
    type: String as PropType<string | (typeof SPRITE_IDS)[keyof typeof SPRITE_IDS]>,
    default: () => SPRITE_IDS.MAIN
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

const iconsSpriteGradsNames = [
  'card_mir_colored',
  'clickup',
  'instagram_colored',
  'mc_pay_mobile_app',
  'mc_vidwide',
  'messenger_colored',
  'payoneer_colored',
  'personal_email_colored',
  'steam_colored',
  'telegram_colored',
]
const GRADS = new Set(iconsSpriteGradsNames)

const iconsSpriteFlagsNames = [
  'flag_ar',
  'flag_en',
  'flag_es',
  'flag_pt',
  'flag_ru',
  'flag_th',
  'flag_vi',
]
const FLAGS = new Set(iconsSpriteFlagsNames)

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

const computedSpriteId = computed(() => {
  if (GRADS.has(props.name)) return SPRITE_IDS.GRADS
  if (FLAGS.has(props.name)) return SPRITE_IDS.FLAGS
  return props.spriteId
})

</script>

<template>
  <svg :class="classes" :style="styles">
    <use :xlink:href="`#${computedSpriteId}-${props.name}`"></use>
  </svg>
</template>

<style lang="scss" src="./index.scss"></style>
