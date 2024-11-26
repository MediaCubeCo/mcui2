<script setup lang="ts">
//@ts-ignore
import defaultImage from '@/assets/img/no_user.png'
import { computed, ref, watch } from 'vue'
import { AvatarSizes, type AvatarSizeTypes } from '@/types/styles/AvatarSizes'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { Sizes } from '@/types/styles/Sizes'
import { Radiuses } from '@/types'

const props = defineProps({
  /**
   *  Путь до изображения
   *
   */
  src: {
    type: String,
    default: defaultImage
  },
  /**
   *  Отложенная подгрузка
   *
   */
  lazy: {
    type: Boolean,
    default: false
  },
  /**
   *  Атрибут alt
   */
  alt: {
    type: String,
    default: ''
  },
  /**
   *  Размеры
   */
  size: {
    type: String as () => AvatarSizeTypes,
    default: '300'
  },
  /**
   *  Круглый
   *
   */
  rounded: {
    type: Boolean,
    default: false
  },
  /**
   *  Цвет рамки
   *
   */
  borderColor: {
    type: String as () => ColorTypes,
    default: ''
  },
  /**
   *  Цвет точки
   *
   */
  dotColor: {
    type: String as () => ColorTypes,
    default: ''
  },
  /**
   *  Цвет точки
   *
   */
  shadow: {
    type: Boolean,
    default: false
  },
  /**
   *  Перетаскивание изображения
   *
   */
  draggable: {
    type: Boolean,
    default: true
  }
})

const style = ref<{ [key: string]: string }>({})
const wrapperStyle = ref<{ [key: string]: string }>({})
const hasStatus = computed((): boolean => !!props.borderColor || !!props.dotColor)

const classes = computed((): { [key: string]: boolean } => ({
  'mc-avatar': true,
  'mc-avatar--rounded': props.rounded,
  'mc-avatar--bordered': !!props.borderColor,
  'mc-avatar--shadow': props.shadow && !hasStatus.value,
  [`mc-avatar--size-${props.size}`]: !!props.size
}))

const wrapperClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-avatar__wrapper': true,
    'mc-avatar__wrapper-status--shadow': !!props.shadow,
    [`mc-avatar__wrapper-status--size-${props.size}`]: !!props.size,
    'mc-avatar__wrapper--has-dot': !!props.dotColor
  }
})

watch(
  () => props.dotColor,
  () => {
    if (hasStatus.value) {
      if (props.dotColor) wrapperStyle.value['--mc-avatar-dot-color'] = Colors[props.dotColor]
    }
  },
  { immediate: true }
)

watch(
  () => props.borderColor,
  () => {
    if (hasStatus.value) {
      if (props.borderColor) style.value['--mc-avatar-border-color'] = Colors[props.borderColor]
    }
  },
  { immediate: true }
)

watch(
  () => props.size,
  () => {
    if (props.size) {
      style.value['--mc-avatar-avatar-size'] = AvatarSizes[props.size]
      if (+props.size < 500) {
        wrapperStyle.value['--mc-avatar-dot-size'] = Sizes['100']
        style.value['--mc-avatar-avatar-radius'] = Radiuses['50']
      }
      switch (+props.size) {
        case 500:
        case 600: {
          wrapperStyle.value['--mc-avatar-dot-size'] = Sizes['150']
          break
        }
        case 700:
        case 800:
        case 900:
        case 1000: {
          wrapperStyle.value['--mc-avatar-dot-size'] = Sizes['200']
          wrapperStyle.value['--mc-avatar-dot-border-width'] = '2px'
          break
        }
      }
    }
  },
  { immediate: true }
)
const handleOnError = (e: Event): void => {
  if (!e.target) return
  //@ts-ignore
  e.target.src = defaultImage
}
</script>

<template>
  <div :class="wrapperClasses" :style="wrapperStyle">
    <div :class="classes" :style="style">
      <img
        :src="props.src || defaultImage"
        :alt="props.alt"
        :draggable="props.draggable"
        :lazy="props.lazy"
        class="mc-avatar__img"
        @onerror="handleOnError"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/border-radius' as *;
$color-borders: $token-colors;
$dot-colors: $token-colors;

.mc-avatar {
  $avatar-name: &;
  --mc-avatar-avatar-size: #{$size-300};
  --mc-avatar-border-color: initial;
  @include reset();
  position: relative;
  display: inline-block;
  width: var(--mc-avatar-avatar-size);
  height: var(--mc-avatar-avatar-size);
  min-width: var(--mc-avatar-avatar-size);
  border-radius: $radius-100;
  border: var(--mc-avatar-dot-border-width) solid $color-white;
  overflow: hidden;
  background-color: $color-hover-gray;
  transition: box-shadow $duration-s;
  &--bordered {
    border: 2px solid var(--mc-avatar-border-color);
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &--rounded {
    border-radius: $radius-circle;
  }

  &--shadow {
    &:hover,
    &:focus {
      box-shadow: 0 0 0 $space-100 $color-hover-gray;
    }
  }

  &:hover,
  &:focus {
    .mc-avatar {
      box-shadow: none;
    }
  }

  &--shadow {
    &:hover,
    &:focus {
      background-color: $color-hover-gray;
      box-shadow: 0 0 0 $space-50 $color-hover-gray;
    }
  }
  &__wrapper {
    --mc-avatar-dot-color: transparent;
    --mc-avatar-dot-border-width: 1px;
    --mc-avatar-dot-size: #{$space-100};
    position: relative;
    width: max-content;
    height: max-content;
    border: none !important;
    &--has-dot {
      &::after {
        width: var(--mc-avatar-dot-size);
        height: var(--mc-avatar-dot-size);
        @include pseudo();
        left: 0;
        bottom: 0;
        background-color: var(--mc-avatar-dot-color);
        z-index: 2;
        border-radius: 50%;
      }
    }
  }
}
</style>
