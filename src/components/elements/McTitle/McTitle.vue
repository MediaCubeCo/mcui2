<script setup lang="ts">
import { type HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import { sanitize } from '@/utils/sanitize'
import { LineHeights, type LineHeightTypes } from '@/types/styles/LineHeights'
import { type WeightsUnion } from '@/types/styles/Weights'

import { computed, type PropType, useAttrs } from 'vue'
import { FontWeights } from '@/types/styles/FontWeights'
import { adaptiveAdditionalProps, adaptivePropsParams, adaptivePropsSizes } from '@/utils/mcTitleAdaptiveProps'
import type { TitleVariationsUnion } from '@/types/ITitle'
import { useHelper } from '@/composables/useHelper'
import { ColorTypes } from '@/types/styles/Colors'
import { useTheme } from '@/composables/useTheme'

const helper = useHelper()
const attrs = useAttrs()
const props = defineProps({
  ...adaptiveAdditionalProps,
  /**
   * Уровень: `h1`, `h2`, `h3`, `h4`, `subtitle`, `body`, `overline`, `article`, 'info'.
   */
  variation: {
    type: String as () => TitleVariationsUnion,
    default: 'body'
  },
  /**
   * В одну строку с точками в конце, если не вмещается
   */
  ellipsis: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  block: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Если нужен другой тэг
   */
  tagName: {
    type: String as PropType<string>,
    default: 'span'
  },
  /**
   * Заглавные буквы
   */
  uppercase: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Цвет
   */
  color: {
    type: String as () => ColorTypes
  },
  /**
   *  Позиция текста:
   *  `left, center, right`
   */
  textAlign: {
    type: String as () => HorizontalAlignmentUnion,
    default: 'left'
  },
  /**
   * Если нужна иная высота строки: `100`, `200`, `300` и т.д.
   */
  lineHeight: {
    type: String as () => LineHeightTypes,
    default: ''
  },
  /**
   * Толщина текста:
   * normal, medium, semi-bold
   */
  weight: {
    type: String as () => WeightsUnion,
    default: ''
  },
  /**
   * Если нужно указать свою
   * максимальную ширину
   */
  maxWidth: {
    type: String as PropType<string>,
    default: '100%'
  },
  preLine: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  nowrap: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  plainText: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * ** Analog v-html, component use DOMPurify**
   * */
  htmlData: {
    type: String as PropType<string>,
    default: ''
  }
})

const theme = useTheme('title')
const computedColor = computed((): ColorTypes => {
  return props.color || (theme.component.color as ColorTypes)
})

const id = computed(() => {
  return attrs.id as string
})

const responsivePropsClasses = computed((): { [key: string]: boolean } => {
  const result: { [key: string]: any } = {}
  result[`mc-title--variation-${props.variation}`] = !!props.variation
  adaptivePropsParams.forEach((value) => {
    adaptivePropsSizes.forEach((size) => {
      //@ts-ignore
      const sizeValue: string | undefined | unknown = props[`${value}${helper.upperFirst(size)}`]
      result[`mc-title--${value}-${size}-${sizeValue}`] = !!sizeValue
    })
  })

  return result
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-title': true,
  'mc-title--block': props.block,
  'mc-title--ellipsis': props.ellipsis,
  [`mc-title--text-align-${props.textAlign}`]: !!props.textAlign,
  'mc-title--pre-line': props.preLine,
  'mc-title--nowrap': props.nowrap,
  'mc-title--uppercase': props.uppercase,
  'mc-title--line-height': !!props.lineHeight,
  'mc-title--weight': !!props.weight,
  'mc-title--plain-text': props.plainText,
  ...responsivePropsClasses.value
}))
const style = computed((): { [key: string]: string } => {
  let style: { [key: string]: string } = {}
  if (computedColor.value) style['--mc-title-color'] = theme.colors![computedColor.value]
  if (props.weight) style['--mc-title-weight'] = FontWeights[props.weight]
  if (props.lineHeight) style['--mc-title-line-height'] = LineHeights[props.lineHeight]

  return style
})

const contentStyle = computed((): { [key: string]: string } => ({
  '--mc-title-text-max-width': props.maxWidth
}))
const computedData = computed(() => (props.htmlData ? sanitize(props.htmlData) : null))
</script>

<template>
  <div :class="classes" :style="style" :id="id">
    <!-- @slot -->
    <slot name="icon-prepend" />
    <span v-if="props.htmlData" class="mc-title__text" :style="contentStyle" v-html="computedData" />
    <!-- sanitize() -->
    <component :is="props.tagName" v-else class="mc-title__text" :style="contentStyle">
      <slot />
    </component>

    <!-- @slot -->
    <slot name="icon-append" />
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
