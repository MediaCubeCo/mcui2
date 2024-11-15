<script setup lang="ts">
import { Colors, type ColorTypes, Sizes, type SizeTypes } from '@/types'
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String as () => SizeTypes,
    default: '500',
  },
  backgroundColor: {
    type: String as () => ColorTypes,
    default: 'white',
  },
})
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-overlay-color': props.backgroundColor && Colors[props.backgroundColor],
    '--mc-overlay-spinner-size': props.size && Sizes[props.size],
  }
})
</script>

<template>
  <section ref="overlay" class="mc-overlay" :style="styles">
    <div class="mc-overlay__background" />
    <section class="mc-overlay__spinner" />
  </section>
</template>

<style lang="scss">
@import '../../../assets/tokens/z-indexes';
@import '../../../assets/tokens/colors';
.mc-overlay {
  $block-name: &;
  --mc-overlay-spinner-size: initial;
  --mc-overlay-color: initial;
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-overlay;
  &__background {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: var(--mc-overlay-color);
    opacity: 0.85;
  }
  &__spinner {
    display: block;
    border: 2px solid $color-purple;
    border-inline-start-color: transparent;
    border-radius: 50%;
    animation: rotate 1.5s infinite linear;

    width: var(--mc-overlay-spinner-size);
    min-width: var(--mc-overlay-spinner-size);
    height: var(--mc-overlay-spinner-size);
    min-height: var(--mc-overlay-spinner-size);

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
