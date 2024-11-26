<script setup lang="ts">
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { computed, type PropType } from 'vue'
import type { DirectionsUnion } from '@/types/IDirections'
import { type IconsListUnion } from '@/types/styles/Icons'
import { Directions } from '@/enums/ui/Directions'

const props = defineProps({
  /**
   * Путь к спрайту с иконками
   * */
  spritePath: {
    type: String,
    default: '/assets/iconsSprite.svg',
    validator(value: string): boolean {
      return !!value
    }
  },
  /**
   * Имя иконки
   */
  name: {
    type: String as () => IconsListUnion,
    required: true
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

const classes = computed((): { [key: string]: boolean } => ({
  'mc-svg-icon': true,
  [`mc-svg-icon--dir-${props.dir}`]: !!props.dir
}))

const styles = computed((): { [key: string]: string } => ({
  ['--mc-svg-icon-size']: Sizes[props.size],
  ['--mc-svg-icon-weight']: String(props.weight)?.replace('.', '')?.split('')?.join('.'),
  ['--mc-svg-icon-color']: props.color && Colors[props.color]
}))
</script>

<template>
  <svg :class="classes" :style="styles">
    <use :xlink:href="`${props.spritePath}#${props.name}`"></use>
  </svg>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/sizes' as *;
.mc-svg-icon {
  --mc-svg-icon-size: #{$size-250};
  --mc-svg-icon-weight: 1.5;
  --mc-svg-icon-color: initial;
  @include reset();
  @include reset-text-indents();

  @include size(inherit);
  width: var(--mc-svg-icon-size);
  height: var(--mc-svg-icon-size);
  min-width: var(--mc-svg-icon-size);
  min-height: var(--mc-svg-icon-size);
  stroke-width: var(--mc-svg-icon-weight);
  color: var(--mc-svg-icon-color);
  use {
    stroke-width: var(--mc-svg-icon-weight);
  }
  &--dir {
    &-rtl {
      transform: scale(-1, 1);
    }
  }
}
</style>
