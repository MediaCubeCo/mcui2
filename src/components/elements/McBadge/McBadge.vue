<script setup lang="ts">
import { type ColorTypes } from '@/types/styles/Colors'
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const theme = useTheme('badge')

interface ISetProperty {
  property?: string | undefined
  value?: string | undefined
  newColor?: ColorTypes
}

const props = defineProps({
  /**
   *  Дизайн:
   *  `purple, purple-outline т.д.`
   */
  variation: {
    type: String as () => ColorTypes,
  },
  /**
   *  Вертикальная черта (в таблице, к примеру)
   */
  verticalLine: {
    type: Boolean,
    default: false
  },
  modern: {
    type: Boolean,
    default: false
  }
})

const computedVariation = computed((): ColorTypes => {
  return props.variation || theme.component.variation as ColorTypes
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-badge': true,
  'mc-badge--vertical-line': props.verticalLine,
  'mc-badge--modern': props.modern
}))

const rootStyles = computed((): { [key: string]: string } => {
  const variation = `${computedVariation.value}${props.modern ? '-modern' : ''}` as ColorTypes

  let style = {} as { [key: string]: string }
  const texts = variation.split('-')
  const currentStyle: string = texts[texts.length - 1]
  const color = (computedVariation.value ? variation.replace(`-${currentStyle}`, '') : variation) as ColorTypes
  const setProperty = ({ property = '--mc-badge-color', value, newColor = color }: ISetProperty = {}) => {
    style[property] = value || newColor && theme.colors[newColor]
  }

  switch (currentStyle) {
    case 'outline': {
      setProperty()
      setProperty({ property: '--mc-badge-border-color' })
      setProperty({ property: '--mc-badge-background-color', newColor: 'white' as ColorTypes })
      setProperty({ property: '--mc-badge-background-opacity', value: '0.4' })
      break
    }
    case 'invert':
    case 'modern': {
      setProperty()
      setProperty({ property: '--mc-badge-background-color' })
      setProperty({ property: '--mc-badge-background-opacity', value: '0.1' })
      break
    }
    default: {
      const lightColors = [
        'hover-gray',
        'white',
        'lighter-blue',
        'lighter-purple',
        'toxic',
        'transparent'
      ] as ColorTypes[]
      lightColors.includes(variation) && setProperty({ newColor: 'black' })
      setProperty({ property: '--mc-badge-background-color', newColor: variation as ColorTypes })
      break
    }
  }
  return style
})
</script>

<template>
  <div :class="classes" :style="rootStyles" v-bind="$attrs">
    <div class="mc-badge__text">
      <slot />
    </div>
    <div class="mc-badge__background"></div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/letter-spacings' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/border-radius' as *;
.mc-badge {
  $block-name: &;
  --mc-badge-color: #{$color-white};
  --mc-badge-background-color: inherit;
  --mc-badge-background-opacity: initial;
  --mc-badge-border-color: #{$color-transparent};
  @include ellipsis(100%, inline-flex);
  align-items: center;
  color: var(--mc-badge-color);
  position: relative;
  font-family: $font-family-main;
  font-size: $font-size-100;
  line-height: $line-height-150;
  height: $line-height-200;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-m;
  vertical-align: middle;
  padding: 2px $space-100;
  border-radius: $radius-50;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    @include size(100%);
    background-color: var(--mc-badge-background-color);
    opacity: var(--mc-badge-background-opacity);
    border: 1px solid var(--mc-badge-border-color);
    border-radius: inherit;
  }
  &__text {
    z-index: 1;
  }
  &--modern {
    border-radius: $radius-50;
  }
  &--vertical-line {
    padding: 0;
    border-radius: 0;
    width: 5px;
    #{$block-name} {
      &__text {
        display: none;
      }
    }
  }
}
</style>
