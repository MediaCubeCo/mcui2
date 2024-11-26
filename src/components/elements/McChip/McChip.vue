<script setup lang="ts">
import { McSvgIcon } from '@/components'
import { computed, type PropType } from 'vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import type { ChipVariationUnion, IChipStyleOptions } from '@/types/IChip'
import { type ChipSizeUnion } from '@/types/IChip'
import type { ColorsUnion } from '@/types/styles/Colors'
import { ChipModifiers } from '@/enums'

const emit = defineEmits(['close', 'click'])
const props = defineProps({
  /**
   *  Text content
   *
   */
  title: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   *  Кнопка закрытия
   *
   */
  closable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   *  Дизайн:
   *  `purple, purple-invert т.д.`
   */
  variation: {
    type: String as () => ChipVariationUnion,
    default: 'transparent',
  },
  /**
   *  Счетчик
   *
   */
  counter: {
    type: [String, Number] as PropType<string | number>,
    default: null,
  },
  /**
   *  Размер
   */
  size: {
    type: String as () => ChipSizeUnion,
    default: 'm',
  },
  /**
   *  Если нужен
   *  иной цвет текста
   */
  textColor: {
    type: String as () => ColorTypes,
    default: '',
  },
})

const classes = computed((): { [key: string]: boolean } => ({
  [`mc-chip--variation-${chipOptions.value.variation}`]: !!props.variation,
  [`mc-chip--size-${props.size}`]: !!props.size,
}))

const chipOptions = computed((): IChipStyleOptions => {
  const variationProps = props.variation?.split('-')
  const currentVariation = variationProps[variationProps.length - 1]
  let color
  let variation
  switch (currentVariation) {
    case ChipModifiers.Outline:
    case ChipModifiers.Invert: {
      variation = currentVariation
      color = props.variation.replace(`-${currentVariation}`, '')
      break
    }
    default: {
      variation = 'default'
      color = props.variation
      break
    }
  }
  return {
    color: color as ColorTypes,
    variation,
  }
})

const styles = computed((): { [key: string]: ColorsUnion } => {
  const textColor = props.textColor || 'white'
  return {
    '--mc-chip-color': Colors[chipOptions.value.color as ColorTypes],
    '--mc-chip-text-color': Colors[textColor],
  }
})

const handleCloseClick = (e: Event): void => {
  emit('close', e)
}
const handleClick = (e: Event): void => {
  emit('click', e)
}
</script>

<template>
  <section class="mc-chip" tabindex="0" :class="classes" :style="styles" @click="handleClick">
    <div v-if="$slots.icon" class="mc-chip__icon">
      <!-- @slot Слот для иконки -->
      <slot name="icon" />
    </div>
    <div v-if="title || $slots.default" class="mc-chip__title">
      <!-- @slot Слот для контента -->
      <slot>
        {{ title }}
      </slot>
    </div>
    <div v-if="counter || counter === 0" class="mc-chip__counter">
      {{ counter }}
    </div>
    <button v-if="closable" class="mc-chip__button" type="button" @click.stop="handleCloseClick">
      <!-- @slot Слот для пользовательской кнопки -->
      <slot name="button">
        <mc-svg-icon size="200" name="cancel" />
      </slot>
    </button>
  </section>
</template>

<style lang="scss">
@use 'sass:color' as sasscolor;
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;

.mc-chip {
  $block-name: &;
  --mc-chip-text-color: #{$color-black};
  --mc-chip-color: #{$color-white};
  display: inline-flex;
  position: relative;
  align-items: center;
  color: var(--mc-chip-color);
  font-family: $font-family-main;
  font-size: $font-size-200;
  line-height: $line-height-200;
  max-width: 100%;
  border-radius: 100px;
  vertical-align: middle;
  outline: none;
  z-index: 0;
  flex-shrink: 0;
  overflow: visible;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: 0;
    @include size(100%);
    border-radius: inherit;
    background-color: var(--mc-chip-color);
  }
  > * {
    margin-right: $space-50;
    z-index: 1;
  }
  > *:first-child {
    margin-left: $space-50;
  }

  &--size {
    @mixin padding-x($space, $space-compact) {
      padding-right: $space;
      padding-left: $space;
      &-compact {
        padding-right: $space-compact;
        padding-left: $space-compact;
      }
    }
    &-m {
      @include padding-x($space-100, $space-50);
      &,
      &-compact {
        height: $size-400;
      }
    }
    &-s {
      @include padding-x($space-100, $space-50);
      &,
      &-compact {
        height: $size-300;
      }
    }
    &-xs {
      @include padding-x($space-50, 0);
      &,
      &-compact {
        height: $space-200;
        font-size: $font-size-100;
        line-height: $line-height-150;
      }
    }
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }
  &__title {
    @include ellipsis();
    @include layout-flex-fix();
    color: var(--mc-chip-text-color);
    &:empty {
      display: none;
    }
  }
  &__counter {
    flex: 0 0 auto;
    font-family: $font-family-main;
    font-size: $font-size-200;
    line-height: $line-height-200;
    color: $color-dark-gray;

    &:empty {
      display: none;
    }
  }
  &__button {
    @include size($size-200);
    position: relative;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-right: 0;
    border-radius: 0;
    user-select: none;
    text-decoration: none;
    text-transform: none;
    background-color: transparent;
    background-image: none;
    cursor: pointer;
    outline: 0;
    border: none;
    transition: all $duration-s;
    flex-wrap: nowrap;
    -webkit-appearance: none;
    -webkit-text-fill-color: currentColor;
    color: $color-dark-gray;
    opacity: 0.2;

    &:hover {
      opacity: 1;
      color: $color-red;
    }

    &:active {
      color: sasscolor.adjust($color-red, $lightness: 15%);
    }
  }

  &--variation {
    &-default {
      #{$block-name} {
        &__button {
          color: var(--mc-chip-color);
          &:hover {
            opacity: 1;
            color: $color-white;
          }
          &:active {
            color: sasscolor.adjust($color-white, $lightness: 15%);
          }
        }
        &__title {
          color: var(--mc-chip-text-color);
        }
        &__counter {
          color: var(--mc-chip-text-color);
          opacity: 0.5;
        }
      }
    }
    &-outline {
      color: var(--mc-chip-color);
      border: 1px solid var(--mc-chip-color);
      &:before {
        display: none;
      }
    }
    &-invert {
      color: $color-black;
      &:before {
        background-color: var(--mc-chip-color);
        opacity: 0.15;
      }
    }
  }
}
</style>
