<script setup lang="ts">
import { computed, provide } from 'vue'
import type { IGridGutters } from '@/types/IGrid'
import { ColumnAlignment, ColumnJustifyAlignment } from '@/enums/Grid'
import type { ColumnAlignmentUnion, ColumnJustifyAlignmentUnion } from '@/types/styles/Grid'

const props = defineProps({
  /**
   *  Расстояние между колонками по горизонтали
   */
  gutterX: {
    type: Number,
    default: 0
  },

  /**
   *  Расстояние между колонками по вертикали
   */
  gutterY: {
    type: Number,
    default: 0
  },

  /**
   *  Выравнивание по горизонтали
   */
  justify: {
    type: String as () => ColumnJustifyAlignmentUnion,
    default: ColumnJustifyAlignment.Left
  },

  /**
   *  Выравнивание по вертикали
   */
  align: {
    type: String as () => ColumnAlignmentUnion,
    default: ColumnAlignment.Top
  },

  /**
   *  Автоматически тянущиеся колонки
   */
  stretch: {
    type: Boolean,
    default: false
  },

  /**
   *  Перенос колонок
   */
  wrap: {
    type: Boolean,
    default: true
  }
})

provide('provideData', { gutterX: props.gutterX, gutterY: props.gutterY } as IGridGutters)

const classes = computed((): { [key: string]: boolean } => {
  return {
    [`mc-grid-row--justify-${props.justify}`]: !!props.justify,
    [`mc-grid-row--align-${props.align}`]: !!props.align,
    ['mc-grid-row--stretch']: !!props.stretch
  }
})

const styles = computed((): { [key: string]: string | number } => {
  let result = {} as { [key: string]: string | number }

  if (props.gutterX !== 0) {
    result['margin-left'] = `${-props.gutterX / 2}px`
    result['margin-right'] = `${-props.gutterX / 2}px`
  }

  if (props.gutterY !== 0) {
    result['margin-top'] = `${-props.gutterY / 2}px`
    result['margin-bottom'] = `${-props.gutterY / 2}px`
  }

  if (props.wrap) {
    result['flex-wrap'] = 'wrap'
  }
  let justify
  switch (props.justify) {
    case 'left':
      justify = 'flex-start'
      break
    case 'right':
      justify = 'flex-end'
      break
    case 'center':
      justify = 'center'
      break
    case 'around':
      justify = 'space-around'
      break
    case 'between':
      justify = 'space-between'
      break
  }
  let align
  switch (props.align) {
    case 'top':
      align = 'flex-start'
      break
    case 'middle':
      align = 'center'
      break
    case 'bottom':
      align = 'flex-end'
      break
    case 'stretch':
      align = 'stretch'
      break
  }
  if (align) result['--mc-grid-row-align'] = align
  if (justify) result['--mc-grid-row-justify'] = justify

  return result
})
</script>

<template>
  <div class="mc-grid-row" :class="classes" :style="styles">
    <!-- @slot Слот для дочерних mc-grid-col -->
    <slot />
  </div>
</template>

<style lang="scss">
.mc-grid-row {
  $block-name: &;
  display: flex;
  flex-direction: row;
  justify-content: var(--mc-grid-row-justify);
  align-items: var(--mc-grid-row-align);
  &--stretch {
    > .mc-grid-col {
      flex: 1;
    }
  }
}
</style>
