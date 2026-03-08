<script setup lang="ts">
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import { computed, type PropType } from 'vue'
import { CellSizes } from '@/enums/Cell'
import type { CellSizesUnion } from '@/types/ICell'
import { TitleVariations } from '@/enums/Title'
const props = defineProps({
  /**
   * Заголовок
   */
  title: {
    type: String as PropType<string>,
    default: '',
  },
  /**
   * Размеры отступов: 's, m, l'
   */
  size: {
    type: String as () => CellSizesUnion,
    default: CellSizes.M,
  },
  /**
   * Заглавные буквы заголовка
   */
  uppercase: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * Три точки
   */
  ellipsis: {
    type: Boolean as PropType<boolean>,
    default: true,
  }
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    [`mc-cell--size-${props.size}`]: !!props.size
  }
})
</script>

<template>
  <section class="mc-cell" :class="classes">
    <div class="mc-cell__title">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title :variation="TitleVariations.Overline" :uppercase="props.uppercase" :ellipsis="props.ellipsis">
          {{ props.title }}
        </mc-title>
      </slot>
    </div>
    <div class="mc-cell__content">
      <!-- @slot Слот контента -->
      <slot />
    </div>
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
