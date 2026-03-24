<script setup lang="ts">
import { computed } from 'vue'
import type { PreviewSizesUnion } from '@/types/IPreview'


const props = defineProps({
  /**
   *  Размеры:
   *  `s, m, l`
   */
  size: {
    type: String as () => PreviewSizesUnion,
    default: 'm'
  }
})
const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-preview': true,
    [`mc-preview--size-${props.size}`]: !!props.size
  }
})
</script>

<template>
  <section :class="classes">
    <div v-if="$slots.left" class="mc-preview__left">
      <!-- @slot Слот слева -->
      <slot name="left" />
    </div>
    <div class="mc-preview__center">
      <div class="mc-preview__top">
        <!-- @slot Слот сверху -->
        <slot name="top" />
      </div>
      <div v-if="$slots.bottom" class="mc-preview__bottom">
        <!-- @slot Слот внизу -->
        <slot name="bottom" />
      </div>
    </div>
    <div v-if="$slots.right" class="mc-preview__right">
      <!-- @slot Слот справа -->
      <slot name="right" />
    </div>
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
