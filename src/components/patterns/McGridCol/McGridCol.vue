<script setup lang="ts">
import _upperFirst from 'lodash/upperFirst'
import {
  adaptiveAdditionalProps,
  adaptivePropsParams,
  adaptivePropsSizes
} from '@/utils/mcGridColAdaptiveProps'
import { computed, inject } from 'vue'
import type { IGridGutters } from '@/types/IGrid'
import type { ColumnSpanUnion } from '@/types/styles/Grid'

const provideData = inject('provideData', { gutterX: 0, gutterY: 0 } as IGridGutters)

const props = defineProps({
  ...adaptiveAdditionalProps,
  /**
   *  Кол-во колонок (всего 12)
   */
  span: { type: [String as () => ColumnSpanUnion] },

  /**
   *  Очерёдность
   */
  order: { type: Number },

  /**
   *  Отступ (margin-left)
   */
  offset: { type: Number },

  /**
   *  Отступ (left)
   */
  push: { type: Number },

  /**
   *  Отступ (right)
   */
  pull: { type: Number },
  /**
   *  Автоматически тянущаяся колонка
   *  на всё свободное пространство
   */
  stretchSelf: {
    type: Boolean,
    default: false
  },

  /**
   *  Основа флекса, которая является начальным размером элемента
   *  (указывать с единицами измерения: px, %...)
   */
  basis: {
    type: String,
    default: 'auto'
  }
})

const classes = computed((): { [key: string]: boolean } => {
  const list = {} as { [key: string]: boolean }
  adaptivePropsParams.forEach((value) => {
    //@ts-ignore
    list[`mc-grid-col--${value}-${props[value]}`] = !!props[value]
    adaptivePropsSizes.forEach((size) => {
      //@ts-ignore
      const sizeValue = props[`${value}${_upperFirst(size)}`]
      list[`mc-grid-col--${value}-${size}-${sizeValue}`] = !!sizeValue
    })
  })
  return list
})

const styles = computed((): { [key: string]: string | number } => {
  let colStyle = {} as { [key: string]: string | number }

  if (provideData.gutterX !== 0) {
    colStyle['padding-left'] = `${provideData.gutterX / 2}px`
    colStyle['padding-right'] = `${provideData.gutterX / 2}px`
  }

  if (provideData.gutterY !== 0) {
    colStyle['padding-top'] = `${provideData.gutterY / 2}px`
    colStyle['padding-bottom'] = `${provideData.gutterY / 2}px`
  }

  if (props.stretchSelf) {
    colStyle['flex'] = `1 0 ${props.basis}`
  } else if (props.basis !== 'auto') {
    colStyle['flex'] = `0 0 ${props.basis}`
  }

  return props.order ? { ...colStyle, order: props.order } : colStyle
})
</script>

<template>
  <div :class="classes" :style="styles" class="mc-grid-col">
    <!-- @slot Слот контента -->
    <slot />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/tokens/media-queries';
.mc-grid-col {
  $block-name: &;
  box-sizing: border-box;
  $cols: 12;

  display: block;
  position: relative;
  max-width: 100%;

  @mixin generate-col($viewport: '') {
    @for $i from 1 through $cols {
      &--span#{$viewport}-#{$i} {
        flex: 0 0 calc((#{$i} / #{$cols}) * 100%);
        max-width: calc((#{$i} / #{$cols}) * 100%);
      }

      &--push#{$viewport}-#{$i} {
        inset-inline-start: calc((#{$i} / #{$cols}) * 100%);
      }

      &--pull#{$viewport}-#{$i} {
        inset-inline-end: calc((#{$i} / #{$cols}) * 100%);
      }

      &--offset#{$viewport}-#{$i} {
        margin-inline-start: calc((#{$i} / #{$cols}) * 100%);
      }

      &--order#{$viewport}-#{$i} {
        order: #{$i};
      }
    }
  }

  @include generate-col('');

  @media #{$media-query-xs} {
    @include generate-col('-xs');
  }

  @media #{$media-query-s} {
    @include generate-col('-s');
  }

  @media #{$media-query-m} {
    @include generate-col('-m');
  }

  @media #{$media-query-l} {
    @include generate-col('-l');
  }

  @media #{$media-query-xl} {
    @include generate-col('-xl');
  }
}
</style>
