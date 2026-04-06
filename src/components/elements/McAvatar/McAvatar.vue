<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AvatarSizes, type AvatarSizeTypes } from '@/types/styles/AvatarSizes'
import { type ColorTypes } from '@/types/styles/Colors'
import { Sizes } from '@/types/styles/Sizes'
import { Radiuses } from '@/types/styles/Radiuses'
import { useTheme } from '@/composables/useTheme'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'

const props = defineProps({
  /**
   *  Путь до изображения
   *
   */
  src: {
    type: String,
    default: ''
  },
  /**
   *  Отложенная подгрузка
   *
   */
  lazy: {
    type: Boolean,
    default: true
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

const theme = useTheme('avatar')
const hasError = ref<boolean>(false)
const imageSrc = ref<string | null>(props.src)

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
    'mc-avatar__wrapper-status--shadow': props.shadow,
    [`mc-avatar__wrapper-status--size-${props.size}`]: !!props.size,
    'mc-avatar__wrapper--has-dot': !!props.dotColor
  }
})

const style = computed((): { [key: string]: string } => {
  let result = {
    '--mc-avatar-avatar-size': AvatarSizes[props.size]
  }

  if (hasStatus.value) {
    // @ts-ignore
    result['--mc-avatar-border-color'] = theme.colors[props.borderColor]
  }

  return result
})

const wrapperStyle = computed((): { [key: string]: string } => {
  if (!hasStatus.value) return {}

  let dot_size = Sizes['150']
  let border_width = '1px'
  let av_radius = '0'

  if (+props.size < 500) {
    dot_size = Sizes['100']
    av_radius = Radiuses['50']
  }
  if (+props.size >= 700) {
    dot_size = Sizes['200']
    border_width = '2px'
  }

  return {
    '--mc-avatar-dot-color': theme.colors[props.dotColor],
    '--mc-avatar-dot-size': dot_size,
    '--mc-avatar-dot-border-width': border_width,
    '--mc-avatar-avatar-radius': av_radius
  }
})

watch(
  () => props.src,
  () => {
    if (imageSrc.value === props.src) return
    hasError.value = false
    imageSrc.value = props.src
  },
  { immediate: true }
)
const handleOnError = (): void => {
  hasError.value = true
}
</script>

<template>
  <div :class="wrapperClasses" :style="wrapperStyle">
    <div :class="classes" :style="style">
      <img
        v-show="imageSrc && !hasError"
        :src="imageSrc as string"
        :alt="props.alt"
        :draggable="props.draggable"
        :lazy="props.lazy"
        class="mc-avatar__img"
        @error="handleOnError"
      />
      <mc-svg-icon
        v-show="!imageSrc || hasError"
        name="no_user"
        :size="props.size"
        :color="theme.component.defaultIcon"
        style="margin-left: -1px"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
