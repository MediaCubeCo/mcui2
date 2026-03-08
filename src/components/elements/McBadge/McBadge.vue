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

<style lang="scss" src="./index.scss"></style>
