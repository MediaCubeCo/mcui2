<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import 'vue3-cropperjs/dist/v3cropper.css'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types/styles/Colors'

const emit = defineEmits(['crop', 'ready'])

const props = defineProps({
  imgSrc: {
    type: String,
    default: null
  },
  cropBoxResizable: {
    type: Boolean,
    default: true
  }
})

const theme = useTheme('cropper')

const VueCropper = shallowRef<Record<string, unknown> | null>(null)
const cropper = ref<{ replace: (v: string) => void } | null>(null)

const cropperStyle = computed(
  (): Record<string, string> => ({
    '--mc-cropper-color': theme.colors[theme.component.color as ColorTypes]
  })
)

const isClient = computed(() => typeof window !== 'undefined')

onMounted(async () => {
  // @ts-ignore
  const m = (await import('vue3-cropperjs')) as {
    default?: unknown
    v3Cropper?: unknown
  }
  const C = (m?.default ?? m?.v3Cropper ?? m) as { default?: unknown } | undefined
  VueCropper.value = (C && typeof C === 'object' && 'default' in C ? C.default : C) as Record<string, unknown> | null
})

const setImage = (value: string): void => {
  cropper.value?.replace(props.imgSrc || value)
}

const cropImage = (e: any): void => {
  e.target?.cropper
    ?.getCroppedCanvas({
      maxWidth: 650,
      maxHeight: 650
    })
    .toBlob((blob: Blob) => {
      emit('crop', blob)
    })
}

const debouncedCropImage = useDebounceFn((e: any) => cropImage(e), 200)

watch(
  () => props.imgSrc,
  (value) => {
    if (value) setImage(value)
  }
)
</script>

<template>
  <section class="mc-cropper" :style="cropperStyle">
    <component
      :is="VueCropper"
      v-if="isClient && VueCropper"
      ref="cropper"
      background
      alt="Avatar"
      :aspect-ratio="1 / 1"
      :initial-aspect-ratio="1 / 1"
      :crop-box-resizable="props.cropBoxResizable"
      :highlight="false"
      :guides="false"
      :zoomable="false"
      :view-mode="2"
      :src="imgSrc"
      @ready="emit('ready', $event)"
      @crop="debouncedCropImage"
    />
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
