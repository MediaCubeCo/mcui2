<script setup lang="ts">
import { ref, watch } from 'vue'
//@ts-ignore
import VueCropper from 'vue3-cropperjs'
import 'vue3-cropperjs/dist/v3cropper.css'

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
const cropper = ref<InstanceType<VueCropper>>(null)
const timeout = ref<number | null>(null)

watch(
  () => props.imgSrc,
  (value) => {
    setImage(value)
  }
)
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
</script>

<template>
  <section class="mc-cropper">
    <vue-cropper
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

  $color-main: $color-purple;

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
