<script setup lang="ts">
import { computed, ref, watch } from 'vue'

let VueCropper: any = null

if (typeof window !== 'undefined') {
  //@ts-ignore
  VueCropper = (await import('vue3-cropperjs')).default
}
import 'vue3-cropperjs/dist/v3cropper.css'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types'

const emit = defineEmits(['crop', 'ready'])
const props = defineProps({
  /**
   *  Путь к изображению
   *
   */
  imgSrc: {
    type: String,
    default: null
  }
})

const theme = useTheme('cropper')

//@ts-ignore
const cropper = ref<InstanceType<VueCropper>>(null)
const timeout = ref<number | null>(null)


const cropperStyle = computed((): { [key: string]: string } => {
  return {
    '--mc-cropper-color': theme.colors[theme.component.color as ColorTypes],
  }
})

const isClient = computed((): boolean => {
  return typeof window !== 'undefined'
})

const setImage = (value: string): void => {
  cropper.value.replace(props.imgSrc || value)
}

const debounce = (method: TimerHandler): void => {
  clearDebounce()
  timeout.value = setTimeout(method, 200)
}

const cropImage = (e: any): void => {
  e.target?.cropper
    ?.getCroppedCanvas({
      maxWidth: 650,
      maxHeight: 650
    })
    .toBlob((blob: Blob) => {
      /**
       * Событие по обрезке
       * @property {blob}
       */
      emit('crop', blob)
    })
  clearDebounce()
}

const clearDebounce = (): void => {
  timeout.value && clearTimeout(timeout.value)
}

watch(
  () => props.imgSrc,
  (value) => {
    setImage(value)
  }
)
</script>

<template>
  <section class="mc-cropper" :style="cropperStyle">
    <vue-cropper
      v-if="isClient"
      ref="cropper"
      background
      alt="Avatar"
      :aspect-ratio="1 / 1"
      :initial-aspect-ratio="1 / 1"
      :highlight="false"
      :guides="false"
      :zoomable="false"
      :view-mode="2"
      :src="imgSrc"
      @ready="emit('ready', $event)"
      @crop="(e: any) => debounce(() => cropImage(e))"
    />
  </section>
</template>

<style lang="scss">
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/opacities' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/media-queries' as *;
.mc-cropper {
  $block-name: &;

  $color-main: var(--mc-cropper-color);

  .cropper {
    &-modal {
      opacity: $opacity-active;
      background-color: $color-white;
    }

    &-face,
    &-line,
    &-point {
      opacity: 0;
    }

    &-view-box {
      border-radius: $radius-circle;
      outline: 1px dashed $color-main;
    }

    &-line {
      background-color: $color-main;
    }

    &-point {
      background: $color-main;

      &.point-se {
        @media #{$media-query-xl} {
          opacity: 1;
        }

        &:before {
          background-color: $color-main;
        }
      }
    }

    &-center {
      display: none;
    }

    &-canvas {
      height: 100% !important;
    }

    &-hide {
      height: 100% !important;
    }
  }
}
</style>
