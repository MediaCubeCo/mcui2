<script setup lang="ts">
import McTitle from '../../elements/McTitle/McTitle.vue'
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

<style lang="scss">
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/spacings';
@import '../../../assets/tokens/font-families';
.mc-cell {
  $block-name: &;
  font-family: $font-family-main;

  &--size {
    &-s {
      #{$block-name}__content {
        margin-top: 0;
      }
    }

    &-m {
      #{$block-name}__content {
        margin-top: $space-50;
      }
    }

    &-l {
      #{$block-name}__content {
        margin-top: $space-100;
      }
    }
  }

  &__content {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
