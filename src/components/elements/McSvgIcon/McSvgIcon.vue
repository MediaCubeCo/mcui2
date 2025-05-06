<script setup lang="ts">
//@ts-ignore
import mediacubeUiSprite from '@/assets/iconsSprite.svg?raw'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { computed, onBeforeMount, type PropType } from 'vue'
import type { DirectionsUnion } from '@/types/IDirections'
import { type IconsListUnion } from '@/types/styles/Icons'
import { Directions } from '@/enums/ui/Directions'
import { adaptiveAdditionalProps, adaptivePropsParams, adaptivePropsSizes } from '@/utils/mcSvgIconAdaptiveProps'
import { useHelper } from '@/composables'

const helper = useHelper()
const props = defineProps({
  ...adaptiveAdditionalProps,
  /**
   * Путь к спрайту с иконками
   * */
  spritePath: {
    type: String,
    default: null,
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

const responsivePropsClasses = computed((): { [key: string]: boolean } => {
  const result: { [key: string]: any } = {}
  adaptivePropsParams.forEach((value) => {
    adaptivePropsSizes.forEach((size) => {
      //@ts-ignore
      const sizeValue: string | undefined | unknown = props[`${value}${helper.upperFirst(size)}`]
      result[`mc-svg-icon--${value}-${size}-${sizeValue}`] = !!sizeValue
    })
  })

  return result
})

const classes = computed((): { [key: string]: boolean } => ({
  'mc-svg-icon': true,
  [`mc-svg-icon--dir-${props.dir}`]: !!props.dir,
  ...responsivePropsClasses.value,
}))

const styles = computed((): { [key: string]: string } => ({
  ['--mc-svg-icon-size']: Sizes[props.size],
  ['--mc-svg-icon-weight']: String(props.weight)?.replace('.', '')?.split('')?.join('.'),
  ['--mc-svg-icon-color']: props.color && Colors[props.color]
}))

onBeforeMount(() => {
  injectSprite()
})

const computedSpritePath =  computed((): string => {
  return props.spritePath || '@/assets/iconsSprite.svg?raw'
})

const spriteId = computed(() => {
  return computedSpritePath.value.replace(/\//gm, '').substring(0, 50)
})

const injectSprite = async () => {
  if (document.getElementById(spriteId.value)) return

  const div = document.createElement('div')
  div.id = spriteId.value
  div.style.display = 'none'
  div.style.visibility = 'hidden'
  div.innerHTML = mediacubeUiSprite

  document.body.appendChild(div)
}
</script>

<template>
  <svg :class="classes" :style="styles">
    <use :xlink:href="`#mcSvgIcon-${props.name}`"></use>
  </svg>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/media-queries' as *;
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
  @each $media, $value in $token-media-queries {
    @media #{$value} {
      @each $size, $sValue in $token-icon-sizes {
        &--size-#{$media}-#{$size} {
          @include size($sValue);
        }
      }
    }
  }
  &--dir {
    &-rtl {
      transform: scale(-1, 1);
    }
  }
}
</style>
