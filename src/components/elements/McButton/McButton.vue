<script setup lang="ts">
import { computed, inject, type PropType, ref } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import { FontWeights } from '@/types/styles/FontWeights'
import { useTooltip } from '@/composables'
import type { ITooltip, TooltipPositionsUnion } from '@/types/ITooltip'
import type { ButtonVariationUnion, IButtonStyleOptions } from '@/types/IButton'
import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'
import { McSvgIcon } from '@/components'
import type { ButtonSizeUnion, ButtonTypeUnion } from '@/types/IButton'
import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { WeightsUnion } from '@/types/styles/Weights'
import type { ColorsUnion } from '@/types/styles/Colors'
import type { FontWeightsUnion } from '@/types/styles/FontWeights'
import { ButtonModifiers } from '@/enums'
import { IDSOptions } from '@/types'
import { useTheme } from '@/composables/useTheme'

interface ElButtonTagBind {
  to?: string | null
  href?: string | null
  disabled: boolean
  rel: string
  type: ButtonTypeUnion
  tabindex: number | string | undefined | null
}

const dsOptions = inject<IDSOptions>('dsOptions', {})

const vTooltip = useTooltip()

const buttonTooltip = computed((): ITooltip => {
  let payload = {} as ITooltip
  if (props.tooltip) {
    payload = {
      content: props.tooltip,
      size: TooltipSizes.M,
      placement: props.tooltipPlacement || TooltipPositions.Top,
    }
  }
  return payload
})

const props = defineProps({
  /**
   *  Если нужна ссылка внутри приложения:
   */
  to: {
    type: String as PropType<string>,
  },
  /**
   *  Если нужна обычная ссылка:
   * `https://mediacube.agency/`
   */
  href: {
    type: String as PropType<string>,
  },
  /**
   *  По умолчанию ожидается использование в `Nuxt`
   *
   */
  nuxt: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  target: {
    type: String as PropType<'_self' | '_blank'>,
    default: '_self',
  },
  /**
   *  Отключенное состояние
   *
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Дизэйблить не меняя внешнего вида
   *
   */
  inactive: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Индикация загрузки
   *
   */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Индикация загрузки
   *  вращением иконки
   */
  iconLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Типы:
   *  `button, submit, reset`
   */
  type: {
    type: String as () => ButtonTypeUnion,
    default: null
  },
  /**
   *  Дизайн:
   *  `purple, red, purple-outline, purple-invert, purple-flat и т.д.`
   */
  variation: {
    type: String as () => ButtonVariationUnion,
  },
  /**
   *  Размеры:
   *  `xs, xs-compact, s, s-compact, m, m-compact, l, l-compact`
   */
  size: {
    type: String as () => ButtonSizeUnion,
    default: 'm'
  },
  /**
   *  Тень
   *
   */
  shadow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Круглая (применимо для *-compact size)
   *
   */
  rounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Закругленная
   *
   */
  semiRounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Позиция текста внутри кнопки:
   *  `left, center, right`
   */
  textAlign: {
    type: String as () => HorizontalAlignmentUnion,
    default: 'center'
  },
  /**
   *  На всю ширину
   *
   */
  fullWidth: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Если нужно активное состояние
   *
   */
  isActive: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  exact
   *
   */
  exact: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Заглавные буквы
   */
    uppercase: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Тег по умолчанию
   */
  defaultTag: {
    type: String as PropType<string>,
    default: 'button'
  },
  /**
   * Если нужен другой цвет при взаимодействии
   */
  secondaryColor: {
    type: String as () => ColorTypes,
    default: null
  },
  /**
   * Если нужна подчёркнутая ссылка
   */
  underlineLink: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Если нужен постоянный
   * фон у типа 'flat'
   */
  bgFlat: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Жирность шрифта:
   * `normal, medium, semi-bold`
   */
  weight: {
    type: String as () => WeightsUnion,
    default: 'semi-bold'
  },
  /**
   * Тултип при наличии
   */
  tooltip: {
    type: String as PropType<string>,
    default: null
  },
  tooltipPlacement: {
    type: String as () => TooltipPositionsUnion,
    default: null,
  },

  /**
   * Атрибут tabindex для главного элемента
   *
   */
  tabindex: {
    type: [String, Number]
  }
})

const theme = useTheme('button')
const mcButton = ref(null)
const emit = defineEmits(['blur', 'click'])

const classes = computed((): { [key: string]: boolean } => {
  return {
    [`mc-button--variation-${props.variation}`]: !!props.variation,
    [`mc-button--size-${props.size}`]: !!props.size,
    [`mc-button--text-align-${props.textAlign}`]: !!props.textAlign,
    'mc-button--loading': !!props.loading,
    'mc-button--icon-loading': !!props.iconLoading,
    'mc-button--is-active': !!props.isActive,
    'mc-button--disabled': !!props.disabled,
    'mc-button--rounded': props.rounded && /-compact$/.test(props.size),
    'mc-button--semi-rounded': !!props.semiRounded,
    'mc-button--full-width': !!props.fullWidth,
    'mc-button--uppercase': !!props.uppercase,
    'mc-button--shadow': !!props.shadow,
    'mc-button--secondary-color': !!props.secondaryColor,
    'mc-button--underline-link': !!props.underlineLink,
    'mc-button--bg-flat': !!props.bgFlat,
    [`mc-button--type-${buttonVariation.value.type}`]: !!buttonVariation.value.type,
    'mc-button--inactive': !!props.inactive
  }
})

const computedVariation = computed(() => {
  return props.variation || theme.component.variation as ColorTypes
})

const buttonVariation = computed((): IButtonStyleOptions => {
  const variation = computedVariation.value
  const texts = variation.split('-')
  const currentStyle = texts[texts.length - 1]
  let color = variation.replace(`-${currentStyle}`, '')
  switch (currentStyle) {
    case ButtonModifiers.Link:
    case ButtonModifiers.Flat:
    case ButtonModifiers.Outline:
    case ButtonModifiers.Invert: {
      break
    }
    default: {
      color = variation
      break
    }
  }
  return {
    color: color as ColorTypes,
    type: currentStyle
  }
})

const styles = computed((): { [key: string]: ColorsUnion | FontWeightsUnion | string | undefined } => {
  let hoverBrightness: string | undefined
  let textColor: ColorTypes | undefined
  switch (buttonVariation.value.type) {
    case ButtonModifiers.Link:
    case ButtonModifiers.Flat:
    case ButtonModifiers.Outline:
    case ButtonModifiers.Invert: {
      break
    }
    default: {
      switch (buttonVariation.value.color) {
        case 'yellow':
        case 'white': {
          hoverBrightness = '0.9'
          break
        }
        case 'toxic': {
          break
        }
        default: {
          textColor = 'white' as ColorTypes
        }
      }
      break
    }
  }

  return {
    '--mc-button-secondary-color': props.secondaryColor && theme.colors[props.secondaryColor],
    '--mc-button-background-color':
      computedVariation.value && theme.colors[buttonVariation.value.color as ColorTypes],
    '--mc-button-font-weight': props.weight && FontWeights[props.weight],
    '--mc-button-hover-brightness': hoverBrightness,
    '--mc-button-text-color': textColor && theme.colors[textColor]
  }
})

const tag = computed((): string => {
  const defaultLink = 'a'
  if (props.to) {
    return defaultLink
  } else if (props.href) {
    return defaultLink
  }
  return props.defaultTag
})

const isVariationLink = computed((): boolean => {
  return buttonVariation.value.type === ButtonModifiers.Link
})

const tagBind = computed((): ElButtonTagBind => {
  let result:ElButtonTagBind = {
    to: props.to,
    href: props.href,
    disabled: false,
    rel: '',
    type: props.type,
    tabindex: props.tabindex
  }

  if (props.to) {
    delete result.href
  } else if (props.href) {
    delete result.to
  } else if (props.disabled || props.loading) {
    result.disabled = true
  }

  if (isVariationLink.value) result.rel = 'noreferrer'

  return result
})

const handleBlur = (e: Event): void => {
  emit('blur', e)
}
const handleClick = (e: Event): void => {
  e.preventDefault()
  if (props.to) {
    if (dsOptions.router) {
      dsOptions.router.push(props.to)
    }
  }
  else window.open(props.href, props.target)
  emit('click', e)
}
</script>

<template>
  <component
    v-tooltip="buttonTooltip"
    :is="tag"
    :ref="mcButton"
    v-bind="{ ...tagBind }"
    class="mc-button"
    :class="classes"
    :exact="exact"
    :style="styles"
    @blur="handleBlur"
    @click="handleClick"
  >
    <span v-if="$slots['icon-prepend']" class="mc-button__prepend">
      <!-- @slot Слот для вставки в начало -->
      <slot name="icon-prepend" />
    </span>
    <span v-if="loading" class="mc-button__loader">
      <mc-svg-icon class="mc-button__loader-icon" type="div" name="loader" />
    </span>
    <span v-if="$slots.default" class="mc-button__text">
      <!-- @slot Слот по умолчанию -->
      <slot />
    </span>
    <span v-if="$slots['icon-append']" class="mc-button__append">
      <!-- @slot Слот для вставки в конец -->
      <slot name="icon-append" />
    </span>
    <div v-if="!isVariationLink" class="mc-button__background" />
  </component>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/styles/tooltip' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/opacities' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/letter-spacings' as *;
@use '../../../assets/tokens/animations' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/media-queries' as *;
@use '../../../assets/tokens/border-radius' as *;

.mc-button {
  $block-name: &;
  @include reset();
  --mc-button-background-color: #{$color-transparent};
  --mc-button-font-weight: #{$font-weight-normal};
  --mc-button-text-color: #{$color-black};
  --mc-button-hover-brightness: 0.9;
  --mc-button-secondary-color: initial;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  flex-wrap: nowrap;
  max-width: 100%;
  font-family: $font-family-main;
  border-radius: $radius-100;
  white-space: nowrap;
  user-select: none;
  text-decoration: none;
  text-transform: none;
  background: none;
  cursor: pointer;
  outline: 0;
  transition: all $duration-s;
  font-weight: var(--mc-button-font-weight);
  color: var(--mc-button-text-color);
  -webkit-appearance: none;
  -webkit-text-fill-color: currentColor;
  z-index: 0;

  &__loader {
    display: none;
    line-height: 0;
    @include align(true, true, absolute);
    top: unset;
    left: unset;
    transform: unset;
    z-index: 1;
    &-icon {
      animation: $animation-spinner;
    }
  }
  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
    z-index: 1;
  }

  &__text {
    @include ellipsis($display: inline-block);
    @include layout-flex-fix();
    z-index: 1;
    &:empty {
      display: none;
    }
  }
  @mixin hoverMixin {
    @media #{$media-desktop} {
      &:hover {
        #{$block-name}__background {
          @content;
        }
      }
    }

    &:active {
      #{$block-name}__background {
        @content;
      }
    }
  }
  @include hoverMixin {
    filter: brightness(var(--mc-button-hover-brightness));
  }

  &--size {
    &-xxs {
      height: $size-300;
      padding: 0 $space-100;
      letter-spacing: normal;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-300);
        padding: $space-50;
        .mc-svg-icon {
          @include size($size-200);
        }
      }
      .mc-svg-icon {
        @include size($size-200);
      }

      #{$block-name} {
        &__prepend {
          margin-inline-end: $space-50;
        }
        &__append {
          margin-inline-start: $space-50;
        }
      }
    }
    &-xs {
      height: $size-400;
      padding: 0 $space-150;
      letter-spacing: normal;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-400);
        padding: 6px;
        .mc-svg-icon {
          @include size($size-250);
        }
      }
      .mc-svg-icon {
        @include size($size-250);
      }

      #{$block-name} {
        &__prepend {
          margin-inline-end: $space-50;
        }
        &__append {
          margin-inline-start: $space-50;
        }
      }
    }
    &-s {
      height: $size-500;
      padding: 0 $space-200;
      letter-spacing: normal;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-500);
        padding: $space-150;
        .mc-svg-icon {
          @include size($size-250);
        }
      }
      .mc-svg-icon {
        @include size($size-250);
      }

      #{$block-name} {
        &__prepend {
          margin-inline-end: $space-50;
        }
        &__append {
          margin-inline-start: $space-50;
        }
      }
    }
    &-m {
      height: $size-500;
      padding: 0 $space-200;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-500);
        padding: $space-100;
        .mc-svg-icon {
          @include size($size-300);
        }
      }
      .mc-svg-icon {
        @include size($size-300);
      }

      #{$block-name} {
        &__prepend {
          margin-inline-end: $space-50;
        }
        &__append {
          margin-inline-start: $space-50;
        }
      }
    }
    &-l {
      height: $size-600;
      padding: $space-150 $space-300;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-600);
        padding: $space-150;
        .mc-svg-icon {
          @include size($size-300);
        }
      }
      .mc-svg-icon {
        @include size($size-300);
      }

      #{$block-name} {
        &__prepend {
          margin-inline-end: $space-100;
        }
        &__append {
          margin-inline-start: $space-100;
        }
      }
    }

    &-s,
    &-m,
    &-l {
      &-compact {
        #{$block-name} {
          &__prepend,
          &__append {
            margin: 0 !important;
          }
        }
      }
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    @include size(100%);
    max-width: -webkit-fill-available;
    opacity: 1 !important;
    border: 1px solid $color-transparent;
    border-radius: inherit;
    background-color: var(--mc-button-background-color);
    transition: all $duration-s;
    box-sizing: border-box;
  }
  &--type {
    &-outline {
      color: var(--mc-button-background-color);
      #{$block-name}__background {
        opacity: 0.6 !important;
        background-color: $color-transparent;
        border-color: var(--mc-button-background-color);
      }
      @media #{$media-desktop} {
        &:hover {
          #{$block-name}__background {
            background-color: var(--mc-button-background-color);
            opacity: 0.2 !important;
          }
        }
        &:active {
          #{$block-name}__background {
            background-color: var(--mc-button-background-color);
            border: none;
          }
        }
      }
    }
    &-invert {
      color: var(--mc-button-background-color);
      #{$block-name} {
        &__background {
          opacity: 0.1 !important;
        }
      }
      @include hoverMixin {
        opacity: 0.2 !important;
      }
    }
    &-flat {
      color: var(--mc-button-background-color);
      #{$block-name}__background {
        opacity: 0 !important;
      }
      @include hoverMixin {
        opacity: 0.1 !important;
      }
    }
    &-link {
      color: var(--mc-button-background-color);
      padding: 0;
      @include size(auto);
      border: none;
      user-select: text;
      &#{$block-name}--size-l {
        line-height: $line-height-250;
      }
      &#{$block-name} {
        &--disabled {
          opacity: $opacity-disabled;
          background-color: transparent !important;
          color: var(--mc-button-background-color) !important;
          border-color: transparent !important;
        }
      }
      @media #{$media-desktop} {
        &:hover {
          filter: brightness(0.85);
        }
      }

      &:active {
        filter: brightness(0.85);
      }
      #{$block-name} {
        &__background {
          display: none;
        }
      }
    }
  }
  &--bg-flat {
    #{$block-name} {
      &__background {
        opacity: 0.1 !important;
      }
    }
  }
  &--shadow {
    box-shadow: 0 3px 10px var(--mc-button-background-color);
  }
  &--underline-link {
    #{$block-name}__text {
      text-decoration: underline !important;
    }
  }

  &--secondary-color {
    @media #{$media-desktop} {
      &:hover {
        color: var(--mc-button-secondary-color);
      }
    }
    &:active {
      color: var(--mc-button-secondary-color);
    }
  }

  &--uppercase {
    text-transform: uppercase;
    letter-spacing: $letter-spacing-m;
  }

  &--is-active,
  &.nuxt-link-active {
    color: var(--mc-button-background-color);
    background-color: transparent;
    border-color: transparent;
    pointer-events: none;
  }

  &--rounded {
    border-radius: $radius-circle;
  }

  &--semi-rounded {
    border-radius: 50px;
  }

  &--full-width {
    width: 100%;
  }

  &--text-align {
    &-left {
      justify-content: flex-start;
    }
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }

  &--loading,
  &--icon-loading,
  &--disabled {
    pointer-events: none;
  }

  &--loading {
    #{$block-name} {
      &__loader {
        display: inline-block;
      }
    }

    > *:not(#{$block-name}__loader) {
      opacity: 0;
    }
  }
  &--icon-loading {
    #{$block-name} {
      &__append,
      &__prepend {
        .mc-svg-icon {
          animation: $animation-spinner;
        }
      }
    }
    #{$block-name}__loader {
      transform-origin: center center;
      animation: $animation-spinner;
    }
  }

  &--disabled {
    color: $color-outline-gray;
    cursor: not-allowed;
    #{$block-name} {
      &__background {
        background-color: $color-hover-gray;
        border-color: $color-hover-gray;
      }
    }
  }

  &--inactive {
    pointer-events: none;
  }
}
</style>
