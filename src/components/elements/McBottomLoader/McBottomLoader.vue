<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types'

const props = defineProps({
  center: {
    type: Boolean,
    default: false
  }
})

const theme = useTheme('bottomLoader')

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-bottom-loader': true,
    'mc-bottom-loader--center': props.center
  }
})
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-bottom-loader-color': theme.colors[theme.component.border as ColorTypes],
  }
})
</script>

<template>
  <section :class="classes" :style="styles">
    <section class="mc-bottom-loader__spinner"></section>
  </section>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/z-indexes' as *;
.mc-bottom-loader {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: transparent;
  z-index: $z-index-overlay;
  &::before {
    @include pseudo();
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $space-700;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top, $color-bg-gray, rgba($color-bg-gray, 0));
    z-index: 11;
  }
  &__spinner {
    position: absolute;
    top: auto;
    bottom: calc(#{$space-350} - calc(#{$space-400} / 2));
    left: calc(50% - #{$space-200});
    transform: translateX(-50%);
    display: block;
    width: $space-300;
    height: $space-300;
    border: 2px solid var(--mc-bottom-loader-color);
    border-left-color: transparent;
    border-radius: 50%;
    animation: rotate 1.5s infinite linear;
    z-index: $z-index-overlay;
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  &--center {
    top: calc(50% - #{$space-200});
  }
}
</style>
