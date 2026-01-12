<script setup lang="ts">
import { type HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import DOMPurify from 'isomorphic-dompurify'
import { LineHeights, type LineHeightTypes } from '@/types/styles/LineHeights'
import { type WeightsUnion } from '@/types/styles/Weights'

import { computed, type PropType, useAttrs } from 'vue'
import { FontWeights } from '@/types/styles/FontWeights'
import { adaptiveAdditionalProps, adaptivePropsParams, adaptivePropsSizes } from '@/utils/mcTitleAdaptiveProps'
import type { TitleVariationsUnion } from '@/types/ITitle'
import { useHelper } from '@/composables'
import { ColorTypes } from '@/types'
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

const computedData = computed(() => (props.htmlData ? DOMPurify.sanitize(props.htmlData) : null))
</script>

<template>
  <div :class="classes" :style="style" :id="id">
    <!-- @slot -->
    <slot name="icon-prepend" />
    <span v-if="props.htmlData" class="mc-title__text" :style="contentStyle" v-html="computedData" />
    <!-- DOMPurify.sanitize() -->
    <component :is="props.tagName" v-else class="mc-title__text" :style="contentStyle">
      <slot />
    </component>

    <!-- @slot -->
    <slot name="icon-append" />
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/letter-spacings' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/media-queries' as *;
.mc-title {
  $block-name: &;
  --mc-title-color: initial;
  --mc-title-weight: initial;
  --mc-title-line-height: initial;
  color: var(--mc-title-color);
  font-family: $font-family-main;
  display: inline-flex;
  align-items: center;
  @mixin variations() {
    &-h1 {
      font-size: $font-size-700;
      line-height: $line-height-600;
      font-weight: $font-weight-semi-bold;
    }
    &-h2 {
      font-size: $font-size-600;
      line-height: $line-height-500;
      font-weight: $font-weight-semi-bold;
    }
    &-h3 {
      font-size: $font-size-500;
      line-height: $line-height-400;
      font-weight: $font-weight-semi-bold;
    }
    &-h4 {
      font-size: $font-size-400;
      line-height: $line-height-300;
      font-weight: $font-weight-bold;
    }
    &-subtitle {
      font-size: $font-size-300;
      line-height: $line-height-250;
    }
    &-article {
      font-size: $font-size-200;
      line-height: $line-height-250;
    }
    &-info {
      font-size: $font-size-300;
      line-height: $line-height-300;
    }
    &-body {
      font-size: $font-size-200;
      line-height: $line-height-200;
    }
    &-overline {
      font-size: $font-size-100;
      line-height: $line-height-150;
      font-weight: $font-weight-medium;
    }
  }
  max-width: 100%;
  width: auto;
  text-decoration: none;
  //@include child-indent-right($space-50);
  &--block {
    display: inline-flex;
    width: 100%;
  }

  &__text {
    padding-bottom: 1px; // fix overflow
    margin-bottom: -1px; // fix overflow
    margin-top: 0;
    max-width: var(--mc-title-text-max-width);
  }

  > *:not(:empty):not(:last-child) {
    margin-inline-end: $space-50;
  }

  .mc-svg-icon,
  .mc-button {
    @include reset-text-indents();
  }

  &--pre-line {
    #{$block-name}__text {
      white-space: pre-line !important;
      word-break: normal;
    }
  }

  &--nowrap {
    #{$block-name}__text {
      white-space: nowrap;
    }
  }

  &--variation {
    @include variations;
  }

  &--ellipsis {
    align-items: center;

    #{$block-name} {
      &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
      }
    }
  }

  &--uppercase {
    text-transform: uppercase;
    letter-spacing: $letter-spacing-m;
  }
  &--plain-text {
    #{$block-name} {
      &__text {
        unicode-bidi: plaintext;
      }
    }
  }

  &--text-align {
    &-left {
      justify-content: flex-start;
      text-align: start;
    }
    &-center {
      justify-content: center;
      text-align: center;
    }
    &-right {
      justify-content: flex-end;
      text-align: end;
    }
  }
  &--line-height {
    line-height: var(--mc-title-line-height);
  }
  &--weight {
    font-weight: var(--mc-title-weight);
  }
  @each $media, $value in $token-media-queries {
    @media #{$value} {
      &--variation-#{$media} {
        @include variations;
      }
      &--weight-#{$media} {
        &-normal {
          font-weight: $font-weight-normal;
        }
        &-medium {
          font-weight: $font-weight-medium;
        }
        &-semi-bold {
          font-weight: $font-weight-semi-bold;
        }
        &-bold {
          font-weight: $font-weight-bold;
        }
      }
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-style: inherit;
    font-size: inherit;
    line-height: inherit;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
