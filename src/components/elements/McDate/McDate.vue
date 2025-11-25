<script setup lang="ts">
import { dayjs } from '@/utils'
import { McTitle } from '@/components'
import { computed, PropType } from 'vue'
import { ColorTypes, TitleVariationsUnion } from '@/types'
import { TitleVariations } from '@/enums'

const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {  // new Date of YYYY-MM-DD format
    type: String as PropType<string>,
    default: null,
  },

  /**
   *  Формат даты
   */
  format: {
    default: 'DD.MM.YYYY',
  },

  /**
   *  Размер даты
   *  `h1`, `h2`, `h3`, `h4`, `subtitle`, `body`, `overline`.
   */
  size: {
    type: String as () => TitleVariationsUnion,
    default: TitleVariations.Body,
  },

  /**
   *  Перенос строк
   */
  ellipsis: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  /**
   *  Заглавные буквы
   */
  uppercase: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   *  Цвет текста:
   *  `purple, red, gray и т.д.`
   */
  color: {
    type: String as () => ColorTypes,
    default: 'black',
  },
})

const dayjsDate = computed((): string => {
  if (!dayjs) return props.modelValue
  return dayjs(props.modelValue).locale('en').format(props.format)
})
</script>

<template>
  <section class="mc-date">
    <!-- @slot Слот для вставки в начало -->
    <slot name="prepend" />
    <time class="mc-date__time" :datetime="dayjsDate">
      <mc-title :variation="size" :ellipsis="ellipsis" :uppercase="uppercase" :color="color">
        {{ dayjsDate }}
      </mc-title>
    </time>
    <!-- @slot Слот для вставки в конец -->
    <slot name="append" />
  </section>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/spacings' as *;
.mc-date {
  $block-name: &;

  display: inline-flex;
  align-items: center;
  @include reset-text-indents();
  @include child-indent-right($space-50);

  &__time {
    font-family: $font-family-main;
  }
}
</style>
